import { Express, NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import { RequestWithSession } from './types';
import { minify } from './utils/middleware';

import Users from './models/user';

import app from './routes/app.routes';
import dashboard from './routes/dashboard.routes';
import utils from './routes/utils.routes';
import customers from './routes/customer.routes';
import products from './routes/product.routes';
import myOrders from './routes/myorders.routes';
import inventory from './routes/inventory.routes';


// Load the favicon from the disk and store it in memory to reduce the number of disk reads
// and to improve the performance of the application. This is done to reduce the number of disk
// reads and to improve the performance of the application. The favicon is a small image that is
// displayed in the browser tab and is used to identify the website. It is important to note that
// the favicon is not required for the application to function, but it is a nice feature to have.

const filePath = join(__dirname, 'public', 'img', 'favicon.ico');
const favicon = readFileSync(filePath);

export default (e: Express) => {

    // Serve the favicon from memory, this is to reduce the number of disk reads
    // and to improve the performance of the application.

    e.get('/favicon.ico', (_: Request, res: Response) => res.writeHead(200, { 'Content-Type': 'image/x-icon' }).end(favicon))

    // Minify the html before sending it to the client, this is to reduce the size of the html
    // and to improve the performance of the application. The minification process removes
    // unnecessary whitespace, comments, and other characters from the html, reducing the size
    // of the html and improving the performance of the application. It is important to note that
    // the minification process can cause issues with the html. To prevent this, the minification
    // process is only applied to html that does not contain the <!--no-minify--> tag.

    app.use(minify());

    // This app route is the only route that does not require the user to be logged in, because it includes
    // routes such as login, logout, and register. anything that doesnt require the user to be logged in should
    // be placed in the app route.

    e.use('/', app);

    // This middleware will check if the user is logged in, if not, it will redirect them to the login page,
    // it is important to note that this middleware should be placed after the app route, as the app route
    // is the only route that does not require the user to be logged in and the middle ware should be placed
    // before the other routes that require the user to be logged in. although the protected routes have thier
    // own middleware to check if the user is logged in, this middleware is lower level and only checks if the 
    // user is logged in and not if they have the required permissions

    e.use((req: RequestWithSession, res: Response, next: NextFunction) => {

        if (!req.session?.user) {
            const url = req.originalUrl;

            // If the user is trying to access the login page or the dashboard page, they should be allowed
            // to access the page without being redirected to the login page, this is to prevent an infinite
            // loop of redirects.

            if (['/login', '/dashboard'].includes(url)) {
                return res.redirect(`/login`); 
            }

            // The r parameter is used to store the url that the user was trying to access before they were
            // redirected to the login page, this is done to redirect the user back to the page they were trying
            // to access after they have logged in.

            res.cookie('r', Buffer.from(url).toString('base64url'), { httpOnly: false, sameSite: 'strict'});
            return res.redirect(`/login?r=${Buffer.from(url).toString('base64url')}`);
        }

        Users.findOne({ where: { id: req.session.user.id } }).then((user) => {
            if (!user) {
                req.session.destroy((err: Error) => {
                    if (err) {
                        console.log(err);
                    }
                });
                return res.redirect('/login');
            }

            user.lastActivity = new Date();
            user.save();

            return next();

        })
    });

    // The following routes have been registed in order of how often they are accessed
    // this is to optimize the performance of the application, the idea is that the application
    // will find the route faster if it is registered first. as of express 4.x, the order of the
    // routes does not matter, but this is still a good practice to follow

    e.use('/utils', utils);
    e.use('/dashboard', dashboard);
    e.use('/customer', customers);
    e.use('/products', products);
    e.use('/myorders', myOrders);
    e.use('/inventory', inventory);
}
