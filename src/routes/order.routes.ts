'use strict';

import { validateEmail } from '../utils/validation';
import Orders from '../models/order';
import OrderItems from '../models/order-item';
import Products from '../models/product';

import express, { Request, Response } from 'express';
import { cache } from '../utils/middleware';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/', cache('dynamic'), (req: Request, res: Response) => {
    res.render('pages/orders', { titleText: 'Orders', layout: 'dashboard.hbs', req })
});