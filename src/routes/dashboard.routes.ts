'use strict';

import express, { Request, Response } from 'express';
import { cache } from '../utils/middleware';
import Products from '../models/product';

const router = express.Router();

// This route is used to render the dashboard page, this page is used to display the user's dashboard
// and to allow the user to access the features of the application.

router.get('/', cache('static'), (req: Request, res: Response) => {
    res.render('pages/dashboard', {titleText: 'Dashboard', layout: 'dashboard.hbs', req});
});

router.get('/api/products', (req: Request, res: Response) => {
    const count = 10;
    const page = 1;

    const configs = {
        order: [['createdAt', 'DESC']],
    } as { [key: string]: number | object | string };

    configs.limit = count;
    configs.offset = (page - 1) * count;

    Products.findAll(configs)
        .then((products) => {
            return res.json({
                code: 200,
                data: {
                    products: products
                }
            })
        }).catch((err) => {
            console.log(err)
            return res.json({
                code: 500,
                error: 'Internal server error'
            })
        })
})

export default router;