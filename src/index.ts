'use strict';

// The following dependencies are built-in node modules that are used by the application, these modules are
// used to perform actions such as reading and writing files, generating random data, and getting information
// about the network interfaces of the server.

import { exit } from 'process';
import { join } from 'path';
import { randomBytes } from 'crypto';
  
// The following dependencies are third-party modules that are used by the application, these modules are used
// to perform actions such as creating the templating engine, starting the server, and handling requests from
// the client. 

import { create } from 'express-handlebars';
import { config as dotenv } from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from "helmet";
import session from 'express-session';
import staticServe from 'serve-static';
import sqlStorage from "connect-session-sequelize";

// The following imports are custom modules that are used by the application, these modules are used to
// perform actions such as connecting to the database, starting the server, and handling requests from the
// client.

import db from './database';
import hbsHelpers from './utils/helpers';
import router from './router';

// This function converts the .env file to environment variables, this is to allow the application to read
// the environment variables from the .env file and use them in the application. the .env file contains
// the configuration settings for the application, such as the port number, the database connection string,
// and other settings. 

dotenv()

const app = express();
const port = process.env.PORT ?? 4004;

app.set('view engine', '.hbs');

// We export the function so that we can refresh the engine when some settings are changed for example the 
// currency codes or the language codes. This is to allow the application to update the helpers with the new
// settings without having to restart the application.

export function registerHelpers() {

    // This webapp is using handlebars as the templating engine, this is to allow for the use of partials
    // and to improve the performance of the application. to learn more about handlebars, visit the following
    // link: https://handlebarsjs.com/guide/

    hbsHelpers().then(helpers => {
        app.engine('.hbs', create({
            extname: '.hbs',
            partialsDir: __dirname + '/views/partials/',
            helpers: helpers
        }).engine);
    })
}

registerHelpers();
app.set('views', join(__dirname, 'views'));

// The following middleware is used to parse the request body, this is to allow the application to read
// the data that is sent from the client, the data is then used to perform actions on the server side.
// the data is sent in the request body as either form data or json data, this middleware is used to
// parse the data and make it available to the application.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression({ threshold: 150, level: 9 }));

// The following middleware is used to create a session for the user, this is to allow the application
// to store data for the user across multiple requests. the session data is stored on the server side
// and is associated with a session id, this session id is then sent to the client as a cookie, the client
// then sends the session id with each request, allowing the server to identify the user and retrieve the
// session data. the session data is stored in memory by default, but can be configured to use a database
// or other storage mechanism. I had some weird instances where the session failed to start, so I added a 
// try catch block to catch the error and log it to the console, and then exit the application. this is 
// to prevent the application from starting without the session, as the session is required for the 
// application to function correctly.
// package: https://www.npmjs.com/package/express-session

const SequelizeStore = sqlStorage(session.Store);

try {
    const Session = session({
        store: new SequelizeStore({
            db: db,
        }),
        secret: process.env.session_secret || randomBytes(64).toString('hex'),
        resave: true,
        saveUninitialized: false,
        cookie: {
            sameSite: 'lax'
        }
    }) as (req: Request, res: Response, next: NextFunction) => void;
    app.use(Session)
} catch (error) {
    console.error('Error starting the server, please check the error below:\n', error);
    process.exit(1);
}

// The following middleware is used to add security headers to the application, this is to prevent
// common security vulnerabilities such as cross-site scripting (XSS) and clickjacking. it also
// adds security headers to prevent the application from being loaded in an iframe. and also
// manages the content security policy (CSP) to prevent the application from loading resources 
// from untrusted sources. package: https://www.npmjs.com/package/helmet

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            'default-src': [
                '\'self\'',
                process.env.system_domain ?? 'rooted-treasures.co.uk',
                'cdn.jsdelivr.net',
                'www.imdb.com'
            ],
            'script-src': [
                'data:',
                '\'self\'',
                process.env.system_domain ?? 'rooted-treasures.co.uk',
                "'unsafe-inline'",
                "'unsafe-eval'",
                'cdn.jsdelivr.net',
                'cdnjs.cloudflare.com',
                'ajax.googleapis.com',
                'www.imdb.com'
            ],
            'img-src': [
                '\'self\'',
                'data:',
                process.env.system_domain ?? 'rooted-treasures.co.uk',
                'www.gravatar.com',
                'www.imdb.com'
            ],
            'connect-src': [
                '\'self\'',
                process.env.system_domain ?? 'rooted-treasures.co.uk',
                'cdn.jsdelivr.net',
                'www.imdb.com'
            ],
        },
    }
}));

// The following middleware is used to prevent search engines from indexing the application, 
// this is to prevent leaking the internal system to the public.

app.use(async (_: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');

    // Only supported in firefox and opera however still useful to have.
    // http://test.greenbytes.de/tech/tc/httplink/
    // https://datatracker.ietf.org/doc/rfc5988/

    res.setHeader('Link', '</favicon.ico>; rel="icon", </assets/css/style.min.css>; rel="stylesheet", <https://cdn.jsdelivr.net/npm/tippy.js@6.3/dist/tippy.min.css>; rel="stylesheet", <https://cdn.jsdelivr.net/npm/toastr2@3.0.0-alpha.18/dist/toastr.min.css>; rel="stylesheet"');
    next();
});

// Static files are served from the public directory, this is to allow the application to serve static files 
// such as images, css, and javascript files to the client. the static files are stored in the public 
// directory and are served to the client when requested. static files dont require a login so its important 
// to serve them before the session middleware. package: https://www.npmjs.com/package/serve-static

app.use('/assets/', staticServe(join(__dirname, 'public')));

// The following middleware is used to load the routes for the application, this is to allow the application
// to handle requests from the client and to perform actions based on the request. the routes are loaded
// from the router file, which contains all the routes for the application. the router file is a separate
// file that contains the routes for the application, this is to allow the application to be modular and
// to separate the concerns of the application.

router(app);

// The following middleware is used to handle 404 errors, this is to allow the application to respond with
// a 404 error when a route is not found. the middleware checks if the request accepts html or json, and
// responds with the appropriate response. if the request does not accept html or json, the middleware
// responds with plain text.

app.use((req: Request, res: Response) => {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        return res.render('errors/404');
    }

    // respond with json
    if (req.accepts('json')) {
        return res.json({ 
            code: 404, 
            error: 'Not found', 
            details: [
                { 
                    message: 'Not found' 
                }
            ] 
        });
    }

    // respond with plain text
    return res.type('txt').send('Not found');
});

// The following middleware is used to handle 500 errors, this is to allow the application to respond with
// a 500 error when an error occurs on the server. the middleware checks if the request accepts html or json,
// and responds with the appropriate response. if the request does not accept html or json, the middleware
// responds with plain text.

app.use(function (err: Error, req: Request, res: Response) {
    res.status(500);
    console.error(err.stack);

    // respond with html page
    if (req.accepts('html')) {
        return res.render('errors/500');
    }

    // respond with json
    if (req.accepts('json')) {
        return res.json({ 
            code: 500, 
            error: 'Internal Server Error', 
            details: [
                { 
                    message: 'Internal Server Error' 
                }
            ] 
        });
    }

    // respond with plain text
    return res.type('txt').send('Internal Server Error');
});

// The following code is used to connect to the database, after the authentication is successful, the
// application initializes the database, this is to allow the application to create the tables and seed
// the database with the initial data. the database is initialized by calling the dbInitiator function,
// which is a function that initializes the database and creates the tables and seeds the database with
// the initial data.

console.log('\x1b[34m⟳\x1b[0m Connecting to the database...')

db.authenticate().then(async () => {

    console.log(`\x1b[32m✔\x1b[0m Connected to database`)
    console.log('\x1b[34m⟳\x1b[0m Starting schedules...')

    console.log('\x1b[34m⟳\x1b[0m Starting server...')

    // The following code is used to start the server, this is to allow the application to listen for requests
    // from the client and to respond to those requests. the server listens on a port, which is specified in the
    // environment variables, if the port is not specified, the server listens on port 8008. the server then logs
    // a message to the console, indicating that the server is running and on which port.

    app.listen(port, async () => {
        console.log('\x1b[32m✔\x1b[0m Server started')
    })    
}).catch((err: Error) => {
    console.log(`\x1b[31mx\x1b[0m Error connecting to database`)
    console.error(err);
    exit();
});