'use strict';

import { validateEmail } from '../utils/validation';
import Orders from '../models/order';
import Products from '../models/product';

import express, { Request, Response } from 'express';
import { cache } from '../utils/middleware';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/', cache('dynamic'), (req: Request, res: Response) => {
    res.render('pages/orders', { titleText: 'Orders', layout: 'dashboard.hbs', req })
});

router.get('/api', (req: Request, res: Response) => {
    Orders.findAll()
        .then((orders) => {
            return res.status(200).json({
                code: 200,
                data: {
                    orders: orders
                }
            })
        }).catch((err: Error) => {
            console.log(err)
            return res.status(500).json({
                code: 500,
                error: 'Internal server error'
            })
        })
})

export default router;