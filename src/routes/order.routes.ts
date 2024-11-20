'use strict';

import Orders from '../models/order';
import Customer from '../models/customer';
import Products from '../models/product';

import express, { Request, Response } from 'express';
import { cache } from '../utils/middleware';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/', cache('dynamic'), (req: Request, res: Response) => {
    res.render('pages/orders', { titleText: 'Orders', layout: 'dashboard.hbs', req })
});

router.get('/api', cache('dynamic'), (req: Request, res: Response) => {
    const query = req.query.q as string;
    const count = parseInt(req.query.count as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const configs = {
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: Customer,
                as: 'customer',
                attributes: ['id', 'name', 'email']
            },
        ]
    } as { [key: string]: number | object | string };

    if (query) {
        configs['where'] = {
            [Op.or]: {
                id: {
                    [Op.like]: `%${query}%`
                },
                name: {
                    [Op.like]: `%${query}%`
                }
            }
        }
    }

    configs.limit = count;
    configs.offset = (page - 1) * count;

    Orders.findAll(configs)
        .then((orders) => {
            return res.json({
                code: 200,
                data: {
                    orders: orders
                }
            });
        }).catch((err) => {
            return res.status(500).json({
                code: 500,
                message: 'Internal server error',
                error: err.message
            });
        });
});

router.get('/api/stats', cache('dynamic'), async (req: Request, res: Response) => {
    return res.json({
        code: 200,
        data: {
            total: await Orders.count()
        }
    });
})

router.get('/api/s/:id', cache('dynamic'), (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id || id === '') {
        return res.json({
            code: 400,
            error: 'ID is required'
        })
    }

    Orders.findByPk(id)
        .then(async (order) => {
            if (order === null) {
                return res.json({
                    code: 404,
                    error: 'Order not found'
                })
            }

            const customer = await Customer.findByPk(order.customerId as number);
            
            const products = [];
            for (let i = 0; i < order.products.length; i++) {
                const product = await Products.findByPk(order.products[i].id as number);
                products.push(product);
            }

            return res.json({
                code: 200,
                data: {
                    order: order,
                    products,
                    customer
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

router.delete('/api/delete/:id', (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id || id === '') {
        return res.json({
            code: 400,
            error: 'ID is required'
        })
    }

    Orders.findByPk(id)
        .then(async (order) => {
            if (order === null) {
                return res.json({
                    code: 404,
                    error: 'Order not found'
                })
            }

            await order.destroy();

            return res.json({
                code: 200,
                data: {
                    order: order
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