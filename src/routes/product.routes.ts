'use strict';

import { validateEmail } from '../utils/validation';
import Products from '../models/product';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api', (req: Request, res: Response) => {
    Products.findAll()
        .then((products) => {
            return res.status(200).json({
                code: 200,
                data: {
                    products: products
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

router.get('/api/s/:id', (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id || id === '') {
        return res.status(400).json({
            code: 400,
            error: 'ID is required'
        })
    }

    Products.findByPk(id)
        .then((product) => {
            if (product === null) {
                return res.status(404).json({
                    code: 404,
                    error: 'Product not found'
                })
            }

            return res.status(200).json({
                code: 200,
                data: {
                    product: product
                }
            })
        }).catch((err: Error) => {
            console.log(err)
            return res.status(500).json({
                code: 500,
                error: 'Internal server error'
            })
        })
});

router.post('/api', (req: Request, res: Response) => {
    const body = req.body;

    if (!body.name || body.name === '') {
        return res.status(400).json({
            code: 400,
            error: 'Name is required'
        })
    }

    Products.create(body)
        .then((product) => {
            return res.status(200).json({
                code: 200,
                data: {
                    product: product
                }
            })
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({
                code: 500,
                error: 'Internal server error'
            })
        })
})

export default router;