import axios from 'axios';
import { readFileSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

import { cache } from '../utils/middleware';
import express, { Request, Response } from 'express';

const router = express.Router();

// This route is used to serve images from a URL that is base64url encoded,
// this is useful for serving images that are behind a firewall in our case
// its used to server images from woocommerce sites that have dynamic domains 
// that are not added to the CORS policy.
//
// *make sure this is registed after the login route, this route should not be
// publicly accessible.

const filePath = path.join(__dirname, '../', 'public', 'img', 'missing.png');
const missing = readFileSync(filePath);

router.get('/camo/:base64url', cache('dynamic'), async (req: Request, res: Response) => {
    const base64url = req.params.base64url;
    const width = req.query.width as string;
    
    if (!base64url) {
        res.writeHead(200, { 'Content-Type': 'image/png' }).end(missing);
    }

    try {
        const image = Buffer.from(base64url, 'base64url').toString('utf-8');
        const response = await axios.get(image, { responseType: 'arraybuffer' });
        let buffer = Buffer.from(response.data, 'binary');
        const responseHeaders = response.headers;
        const responseContentType = responseHeaders['content-type'];

        if (width) {
            buffer = await sharp(buffer).resize({ width: parseInt(width) }).toBuffer();
        }

        res.writeHead(200, { 'Content-Type': responseContentType }).end(buffer);
    } catch (err) {
        res.writeHead(200, { 'Content-Type': 'image/png' }).end(missing);
    }
});

export default router;