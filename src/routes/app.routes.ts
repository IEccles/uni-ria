'use strict';

import { validateEmail, validatePassword } from '../utils/validation';
import user from '../models/user';
import { RequestWithSession } from '../types';
import express, { Request, Response } from 'express';
import { config as dotenv } from 'dotenv';

const router = express.Router();
dotenv();

// This route is used to redirect the user to the dashboard page, this is the default route for the application
// and is used to redirect the user to the dashboard page when they visit the root of the application.

router.get('/', (req: RequestWithSession, res: Response) => {
    if (req.session?.user) {
        return res.redirect('/dashboard')
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

        user.validatePassword(body.password).then((match: boolean) => {
            if (!match) {
                return res.status(400).json({code: 400, error: error});
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


export default router;