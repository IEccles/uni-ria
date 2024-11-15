'use strict';

import Orders from '../models/order';
import { cache } from '../utils/middleware';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', cache('dynamic'), (req: Request, res: Response) => {
    res.render('pages/my_orders', { titleText: 'My Orders', layout: 'dashboard.hbs', req });
});

export default router;