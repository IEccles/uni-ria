'use strict';

import Inventory from '../models/product';
import { cache } from '../utils/middleware';
import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import multer from 'multer';
import { File as MulterFile } from 'multer';

interface MulterRequest extends Request {
    file: MulterFile
}

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', cache('dynamic'), (req: Request, res: Response) => {
    res.render('pages/inventory', { titleText: 'Inventory', layout: 'dashboard.hbs', req });
});

router.get('/api', cache('dynamic'), (req: Request, res: Response) => {
    const query = req.query.q as string;
    const count = parseInt(req.query.count as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const configs = {
        order: [['createdAt', 'DESC']]
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

    configs.limit = count
    configs.offset = (page - 1) * count

    Inventory.findAll(configs)
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
});

router.get('/api/stats', cache('dynamic'), async (_: Request, res: Response) => {
    return res.json({
        code: 200,
        data: {
            total: await Inventory.count()
        }
    });
});

router.get('/api/s/:id', cache('dynamic'), (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id || id === '') {
        return res.json({
            code: 400,
            error: 'ID is required'
        })
    }

    Inventory.findByPk(id)
        .then((inventory) => {
            if (inventory === null) {
                return res.json({
                    code: 404,
                    error: 'Item not found'
                })
            }

            return res.json({
                code: 200,
                data: {
                    inventory: inventory
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

router.post('/api', upload.single('image'), (req: MulterRequest, res: Response) => {
    const body = req.body;

    if (!body.name || body.name === '' || !body.productCategory || body.productCategory === '' || !body.barcodeNumber || body.barcodeNumber === '' || !body.price || body.price === '') {
        return res.json({
            code: 400,
            error: 'Required inputs are midding'
        })
    }

    if (body.id) {
        Inventory.findByPk(body)
            .then(async (product) => {
                if (product === null) {
                    return res.json({
                        code: 404,
                        error: 'Product not found'
                    })
                }

                await product.update(body)
                await product.save()

                return res.json({
                    code: 200,
                    data: {
                        product: product
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
        Inventory.create(body)
            .then((product) => {
                return res.json({
                    code: 200,
                    data: {
                        product: product
                    }
                })
            }).catch((err) => {
                console.log(err);
                return res.json({
                    code: 500,
                    error: 'Internal server error'
                })
            })
    }
});

export default router;