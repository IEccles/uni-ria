'use strict';

import express, { Request, Response } from 'express';
import { cache } from '../utils/middleware';

const router = express.Router();

// This route is used to render the dashboard page, this page is used to display the user's dashboard
// and to allow the user to access the features of the application.

router.get('/', cache('static'), (req: Request, res: Response) => {
    res.render('pages/dashboard', {titleText: 'Dashboard', layout: 'dashboard.hbs', req});
});

export default router;