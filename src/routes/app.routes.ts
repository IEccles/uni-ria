'use strict';

import { validateEmail, validatePassword } from '../utils/validation';
import user from '../models/user';
import tokens from '../utils/tokenStore';
import Email from '../utils/email';
import { RequestWithSession } from '../types';
import express, { Request, Response } from 'express';
import { verifyToken } from "node-2fa";
import { config as dotenv } from 'dotenv';

const router = express.Router();
dotenv();

const tokenStore = new tokens();

// This route is used to redirect the user to the dashboard page, this is the default route for the application
// and is used to redirect the user to the dashboard page when they visit the root of the application.

router.get('/', (req: RequestWithSession, res: Response) => {
    if (req.session?.user) {
        return res.redirect('/dashboard');
    }
    res.redirect('/login');
});

// This route is used to render the login page, this page is used to allow the user to login to the application
// and to access the features of the application. The login page contains a form that allows the user to enter
// their email and password, and to submit the form to login to the application.

// I dont know why but this doesnt get minified.

router.get('/login', (req: RequestWithSession, res: Response) => {
    if (req.session?.user) {
        return res.redirect('/dashboard');
    }
    res.render('pages/login');
});

// This route is used to log the user out of the application, this is done by destroying the session associated
// with the user, this will log the user out of the application and redirect them to the login page.

router.get('/logout', (req: RequestWithSession, res: Response) => {
    req.session.destroy((err: Error) => {
        if (err) {
            console.log(err);
            return res.json({code: 400, error: 'Internal Server Error'});
        }
        res.redirect('/login');
    });
});

// This route is used to handle the login form submission, this is done by validating the email and password
// entered by the user, and then authenticating the user. If the user is authenticated, they are redirected to
// the dashboard page, if the user is not authenticated, they are redirected to the login page with an error message.

router.post('/login', (req: RequestWithSession, res: Response) => {

    // Check if login is disabled and return an error if it is
    // This is useful when you want to disable login for some reason
    // like when you are performing maintenance on the application
    // or when you want to disable login for some other reason.

    if (process.env.login_disabled?.toLocaleLowerCase() === 'true') {
        return res.json({code: 400, error: 'Login is disabled'});
    }

    const body = req.body;
    const remember = `${body.remember}` === 'true' || false;
    const error = 'Invalid email or password';


    // Validate the email and password first before checking the database because
    // it is faster to check if the email and password are valid before checking
    // the database. This is done to reduce the number of database queries and to
    // improve the performance of the application.

    if (!validateEmail(body.email)) return res.status(400).json({code: 400, error: error});
    if (!validatePassword(body.password).pass) return res.status(400).json({code: 400, error: error});

    user.findOne({where: {email: body.email}}).then((user) => {
        if (!user) {
            return res.status(400).json({code: 400, error: error});
        }

        // Validate the password and 2FA code if 2FA is enabled
        // - If the password is invalid, return an error message
        // - If the 2FA code is invalid, return an error message
        // - If the password and 2FA code are valid, log the user in
        //   and redirect them to the dashboard page.

        user.validatePassword(body.password).then((match: boolean) => {
            if (!match) {
                return res.status(400).json({code: 400, error: error});
            }

            if (user.twofa) {
                if (!body.twofa) {
                    return res.status(400).json({code: 400, error: '2FA is enabled'});
                }
    
                const twofa = verifyToken(user.twofa, body.twofa);
    
                if (!twofa || twofa.delta !== 0) {
                    return res.status(400).json({code: 400, error: 'Invalid 2FA code'});
                }
            }

            // Check if the user is active before proceeding with the login

            if (!user.active) {
                return res.status(400).json({code: 400, error: 'User is not active'});
            }

            user.password = '';

            req.session.user = user;

            if (remember) {
                req.session.cookie.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
            }

            return res.status(200).json({code: 200, details: {
                message: 'Login successful'
            }});
        });
    }).catch((err: Error) => {
        console.log(err);
        return res.status(500).json({code: 500, error: 'Internal Server Error'});
    });
});

// This route is used to render teh offline page, used by the service worker to display an offline page
// when the user is offline and tries to access the application. The offline page is a simple page that
// displays a message to the user that they are offline and that they should check their internet connection.

router.get('/errors/offline', (req: Request, res: Response) => {
    res.render('errors/offline');
});

// This route is used to send the user an email with a code which can be used to login if the user has
// forgotten their password. This will check the email the user has inputted to make sure they are already
// in the database.

router.post('/forgot', (req: Request, res: Response) => {
    const email = req.body.email;

    if (!email || email === '') {
        return res.json({
            code: 400,
            error: 'Email is required'
        });
    }

    user.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (user === null) {
            return res.json({
                code: 404,
                error: 'No users found with associated email'
            });
        }

        // Generate a unique token
        const token = tokenStore.generateToken(email);

        const resetLink = `http://${req.headers.host}/reset/${token}`;
        const template = `
            <h2>Password Reset Link</h2>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
        `;

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Email(email, 'Invente Password Reset', template, 1);
            return res.json({
                code: 200,
                message: 'Password reset link has been sent to your email'
            });
        } catch (err) {
            console.log(err);
            return res.json({
                code: 500,
                error: 'Internal server error'
            });
        }
    }).catch((err) => {
        console.log(err);
        return res.json({
            code: 500,
            error: 'Internal server error'
        });
    });
});

router.get('/reset/:token', (req: Request, res: Response) => {
    const email = tokenStore.validateToken(req.params.token);
    if (!email) {
        return res.json({
            code: 400,
            error: 'Password reset token is invalid or has expired'
        });
    }

    // Render a password reset form
    res.render('pages/reset', { token: req.params.token });
});

router.post('/reset/:token', (req: Request, res: Response) => {
    const email = tokenStore.validateToken(req.params.token);
    if (!email) {
        return res.json({
            code: 400,
            error: 'Password reset token is invalid or has expired'
        });
    }

    const password = req.body.password

    if (!password || password === '') {
        return res.json({
            code: 400,
            error: 'Password is required'
        })
    }

    // Validate the new password
    const { pass, details } = validatePassword(req.body.password);
    if (!pass) {
        return res.status(400).json({ code: 400, error: 'Invalid password', details });
    }

    user.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (!user) {
            return res.json({
                code: 404,
                error: 'No users found with associated email'
            });
        }

        const { pass, details } = validatePassword(password);

        if (!pass) {
            return res.json({
                code: 400,
                error: 'Password does not meet the requirements',
                details: details
            })
        }

        user.password = password;
        user.save().then(() => {
            tokenStore.deleteToken(req.params.token);
            return res.json({
                code: 200,
                message: 'Password successfully reset',
                data: {
                    redirect: '/login'
                }
            })
        }).catch((err) => {
            console.log(err);
            return res.json({
                code: 500,
                error: 'Internal server error'
            });
        })
    }).catch((err) => {
        console.log(err);
        return res.json({
            code: 500,
            error: 'Internal server error'
        });
    });
});


export default router;