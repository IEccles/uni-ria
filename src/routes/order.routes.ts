'use strict';

import { validateEmail } from '../utils/validation';
import Orders from '../models/order';
import Products from '../models/product';

import express, { Request, Response } from 'express';
import { cache } from '../utils/middleware';
import { Op } from 'sequelize';
import { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } from 'puppeteer';

const router = express.Router();

router.get('/', cache('dynamic'), (req: Request, res: Response) => {
    res.render('pages/orders', { titleText: 'Orders', layout: 'dashboard.hbs', req })
});

export default router;