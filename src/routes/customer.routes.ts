'use strict';

import Customers from '../models/customer';
import { cache } from '../utils/middleware';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', cache('dynamic'), (req: Request, res: Response) => {
    res.render('pages/customer', { titleText: 'Customers', layout: 'dashboard.hbs', req });
});

router.get('/api', cache('dynamic'), (req: Request, res: Response) => {
    const query = req.query.q as string;
    const count = parseInt(req.query.count as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const configs = {
        limit: count,
        offset: (page - 1) * count
    }

    Customers.findAll(configs)
        .then((customers) => {
            return res.json({
                code: 200,
                data: {
                    customers: customers
                }
            })
        }).catch((err) => {
            console.log(err)
            return res.json({
                code: 500,
                error: 'Internal server error'
            })
        })
});

router.get('/api/s/:id', cache('dynamic'), (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id || id === '') {
        return res.json({
            code: 400,
            error: 'ID is a required parameter'
        })
    }

    Customers.findByPk(id)
        .then((customer) => {
            if (customer === null) {
                return res.json({
                    code: 404,
                    error: 'Customer was not found'
                })
            }

            return res.json({
                code: 200,
                data: {
                    customer: customer
                }
            })
        }).catch((err) => {
            console.log(err)
            return res.json({
                code: 500,
                error: 'Internal server error'
            })
        })
});

router.post('/api', (req: Request, res: Response) => {
    const body = req.body;

    if (!body.firstName || body.firstName || !body.surname || body.surname === '' || !body.email || body.email === '' || !body.password || body.password ==='') {
        return res.json({
            code: 400,
            error: 'Name, email and password are required'
        })
    }

    if (!body.addressLine1 || body.addressLine1 === '' || !body.county || body.county === '' || !body.postCode || body.postCode === '') {
        return res.json({
            code: 400,
            error: 'Address information is required'
        })
    }

    if (body.id) {
        Customers.findByPk(body.id)
            .then(async (customer) => {
                if (customer === null) {
                    return res.json({
                        code: 404,
                        error: 'Customer not found'
                    })
                }

                await customer.update(body)
                await customer.save();

                return res.json({
                    code: 200,
                    data: {
                        customer: customer
                    }
                })
            }).catch((err) => {
                console.log(err)
                return res.json({
                    code: 500,
                    error: 'Internal server error'
                })
            })
    } else {
        Customers.create(body)
            .then((customer) => {
                return res.json({
                    code: 200,
                    data: {
                        customer: customer
                    }
                })
            }).catch((err) => {
                console.log(err)
                return res.json({
                    code: 500,
                    error: 'Internal server error'
                })
            })
    }
});

router.delete('/api', (req: Request, res: Response) => {
    const id = req.query.id as string;

    if (!id || id === '') {
        return res.json({
            code: 400,
            error: 'ID is a required parameter'
        })
    }

    Customers.findByPk(id)
        .then(async (customer) => {
            if (customer === null) {
                return res.json({
                    code: 404,
                    error: 'Customer not found'
                })
            }

            await customer.destroy();

            return res.json({
                code: 200,
                data: {
                    customer: customer
                }
            })
        }).catch((err) => {
            console.log(err)
            return res.json({
                code: 500,
                error: 'Internal server error'
            })
        })
});

export default router;