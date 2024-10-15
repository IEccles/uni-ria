import fs from 'fs';
import minifier from 'html-minifier-terser';
import crypto from 'crypto';
import { RequestWithSession } from '../types';
import { Request, Response, NextFunction } from 'express';
import cacheModel from '../models/cache';
import { config as dotenv } from 'dotenv';
dotenv();


// This is used to remember how many cache files are stored in the cache directory
// without having to read the cache directory every time a new cache file is stored
// aslong as the cache directory is not modified by any other process, the cacheSize
// variable will be accurate, if the cache directory is modified by another process
// the cacheSize variable will be inaccurate, but this is not a problem.

let _cacheSize = 0;

class cacheSizeClass {

    constructor() {}

    increment() {
        _cacheSize++;
    }

    decrement() {
        _cacheSize--;
    }

    get() {
        return _cacheSize;
    }
}

export const cacheSize = new cacheSizeClass();

const cacheDisabled = process.env.cache === 'true' ? false : true;
const cacheDir = process.env.cache_dir || '.cache';
const maxCacheSize = parseInt(process.env.max_cache_size || '1000') || 1000;

// Clear the cache directory and the cache database when the server starts,
// this will prevent the cache from growing too large and consuming too much disk space.

cacheModel.findAll().then((caches) => {
    for (let i = 0; i < caches.length; i++) {
        const cache = caches[i];
        cache.destroy().catch((err) => console.log(err));
    }
}).catch((err) => console.log(err));

if (!fs.existsSync(cacheDir)) {
    try {
        fs.mkdirSync(cacheDir);
    } catch (error) {
        console.error(error);
    }
} else {
    try {
        fs.readdirSync(cacheDir).forEach((file) => {
            fs.unlinkSync(`${cacheDir}/${file}`);
        });
    } catch (error) {
        console.error(error);
    }
}

// Cache is encrypted using AES-256-CTR encryption algorithm, because cache files may contain sensitive data
// and to prevent unauthorized access to the cache files.

const algorithm = 'aes-256-ctr';
const secretKey = Buffer.from(`${process.env.cache_key}`, 'hex'); 
const iv = Buffer.from(`${process.env.cache_iv}`, 'hex');
let encryptCache = process.env.cache_key && process.env.cache_iv ? true : false;

// Check if the encryption is enabled, if the encryption is enabled 
// test to make sure the key and iv are valid, if the key and iv are invalid
// disable the encryption

if (encryptCache) {
    try {
        crypto.createCipheriv(algorithm, secretKey, iv);
        crypto.createDecipheriv(algorithm, secretKey, iv);
    } catch (error) {
        encryptCache = false;
    }
}

// Remove incomplete export statement
export const isEncrypted = encryptCache;

// This function checks if a string is a valid JSON string
// if the string is a valid JSON string, the function will return true

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cache = (type: string): any => {

    return (_: Request, __: Response, next: NextFunction) => {
        next();
    }

    // If the cache is disabled, the middleware will just call the next function
    // without storing the cache in the file system or reading it from the file system
    // this is useful for development purposes when you want to disable the cache and see the changes
    // immediately without having to wait for the cache to expire or manually delete the cache files
    // in production the cache should be enabled.

    if (cacheDisabled) {
        return (_: Request, __: Response, next: NextFunction) => {
            next();
        }
    }

    // The cache middleware will store the cache in the file system and read the cache from the file system
    // the cache will be stored in the cache directory, the cache directory can be changed by setting the
    // cacheFile environment variable, the cache directory will be created if it does not exist.

    return async (req: RequestWithSession, res: Response, next: NextFunction) => {

        // if cacheSize is greater than 1000, clear the cache directory
        // this will prevent the cache directory from growing too large
        // and consuming too much disk space.

        if (cacheSize.get() >= maxCacheSize) {
            try {
                await fs.readdirSync(cacheDir).forEach(async (file) => {
                    await cacheModel.findOne({ where: { hash: file }})
                    .then(async (cache) => {
                        if (cache) {
                            await cache.destroy()
                            .then(async () => {
                                await fs.unlinkSync(`${cacheDir}/${file}`)
                                cacheSize.decrement();
                            })
                            .catch((err) => console.log(err));
                        }
                    })
                    .catch((err) => console.log(err));
                });
            } catch (error) {
                console.error(error);
            }
        }

        let ttl;
        let lastTtl
        let url;
        let cacheHashComponenets;
        let lastCacheHashComponenets;

        // If the type is static the cache will be stored for 5 minutes, so calculate the next 5 minute interval
        // for example if the current time is 12:34:12, the cache will expire at 12:35:00

        if (type === 'static') {
            const currentTime = new Date(); 
            lastTtl = new Date(Math.floor(currentTime.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000));
            ttl = new Date(lastTtl.getTime() + (5 * 60 * 1000))
            url = req.originalUrl.split('?')[0];

            if (!req.session?.user) {
                console.error('User is not logged in, cache will not be stored')
                next();
            }

            cacheHashComponenets = [
                url,
                ttl,
                req .session?.user.id
            ];

            lastCacheHashComponenets = [
                url,
                lastTtl,
                req.session?.user.id
            ];
        }

        // If the type is dynamic the cache will be stored for 1 minute, so calculate the next 1 minute interval
        // for example if the current time is 12:34:12, the cache will expire at 12:35:00

        if (type === 'dynamic') {
            const currentTime = new Date(); 
            lastTtl = new Date(Math.floor(currentTime.getTime() / (1 * 60 * 1000)) * (1 * 60 * 1000));
            ttl = new Date(lastTtl.getTime() + (1 * 60 * 1000))
            url = req.originalUrl;

            cacheHashComponenets = [
                url,
                req.query,
                req.body,
                req.params,
                ttl
            ];

            lastCacheHashComponenets = [
                url,
                req.query,
                req.body,
                req.params,
                lastTtl
            ];
        }

        const time = (ttl.getTime() - new Date().getTime()) / 1000;
        res.setHeader('Cache-Control', `public, max-age=${time}`);

        const cacheHash = crypto.createHash('sha256').update(JSON.stringify(cacheHashComponenets)).digest('hex');
        const cacheFile = `${cacheDir}/${cacheHash}`;

        const lastCacheHash = crypto.createHash('sha256').update(JSON.stringify(lastCacheHashComponenets)).digest('hex');
        const lastCacheFile = `${cacheDir}/${lastCacheHash}`;

        if (await fs.existsSync(lastCacheFile)) {
            await cacheModel.findOne({ where: { hash: lastCacheHash }})
            .then(async (cache) => {
                if (cache) {
                    await cache.destroy()
                    .then(async () => {
                        await fs.unlinkSync(lastCacheFile);
                        cacheSize.decrement();
                    })
                    .catch((err) => console.log(err));
                }
            }).catch((err) => console.log(err));
        }

        // If the cache file exists, read the cache file and send the data back to the client
        // this will prevent the server from processing the request again and again, the cache
        // will be used to serve the data from the file system.

        if (await fs.existsSync(cacheFile)) {
            let cacheData;

            if (encryptCache) {
                const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
                cacheData = Buffer.concat([decipher.update(await fs.readFileSync(cacheFile)), decipher.final()]).toString();
            }

            // If the cache data is a valid JSON string, parse the JSON string and send the data back
            // to the client as JSON, if the cache data is not a valid JSON string, send the data back
            // to the client as is.

            if (isJson(cacheData)) {
                return res.json(JSON.parse(cacheData));
            }

            return res.send(cacheData);
        }

        // If the cache file does not exist, override the res.send function to store the data
        // in the cache file and then send the data back to the client, this will make sure that
        // the cache is stored in the file system and the data is sent back to the client.

        const oldSend = res.send;
        res.send = function (data) {
            res.send = oldSend;
            let body = data.toString();

            if (encryptCache) {
                const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
                body = Buffer.concat([cipher.update(body), cipher.final()]);
            }

            // Store the cache in the file system and then send the data back to the client
            // if there was an error storing the cache, check if the cache directory exists
            // if the cache directory does not exist, create.
            
            try {
                fs.writeFileSync(cacheFile, body);
                cacheSize.increment();

                cacheModel.create({
                    hash: cacheHash,
                    endpoint: url,
                    type: type
                }).catch((err) => {
                    console.error(err);
                });
            } catch (error) {
                if (!fs.existsSync(cacheDir)) {
                    fs.mkdirSync(cacheDir)
                }
            }

            return oldSend.call(res, data);
        };

        next();
    }
} 

// Minify the html before sending it to the client, this is to reduce the size of the html
// and to improve the performance of the application. The minification process removes
// unnecessary whitespace, comments, and other characters from the html, reducing the size
// of the html and improving the performance of the application. It is important to note that
// the minification process can cause issues with the html. To prevent this, the minification
// process is only applied to html that does not contain the <!--no-minify--> tag.

export const minify = () => {
    return (_: Request, res: Response, next: NextFunction) => {
        const oldSend = res.send;
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.send = (data): any => {
            res.send = oldSend;

            if (isJson(data)) {
                return res.json(JSON.parse(data));
            }

            if (data && data.includes('<!DOCTYPE html>')) {
                try {
                    if (data.includes('<!--no-minify-->')) {
                        return res.send(data.toString().replaceAll('<!--no-minify-->', ''));
                    }
            
                    const configs = {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeEmptyAttributes: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                        useShortDoctype: true,
                        preventAttributesEscaping: true,
                        html5: true,
                        decodeEntities: true
                    }
            
                    if (data.includes('<!--no-minify-js-->')) {
                        configs.minifyJS = false;
                        data = data.toString().replaceAll('<!--no-minify-js-->', '');
                    }
            
                    if (data.includes('<!--no-minify-css-->')) {
                        configs.minifyCSS = false;
                        data = data.toString().replaceAll('<!--no-minify-css-->', '');
                    }

                    return minifier.minify(data, configs)
                    .then((minifiedHtml) => {
                        const minified = `<!--\nThis source code is property of Codegalaxy <codegalaxy.co.uk> and is served under \nlicensed usage. Any unauthorised use of this code will result in legal action, this \nincludes copying, modifying, or distributing the code without permission from \ncodegalaxy.co.uk, and any penetration testing, vulnerability scanning, or other \nsecurity testing of this code without permission from codegalaxy.co.uk.\n\nCodegalaxy is a software development company that provides software development\nservices to clients in the UK and around the world. We provide software development\nservices such as web development, mobile app development, desktop app development,\nsoftware development, software consulting, software testing, software maintenance,\nsoftware support, and software training.\n-->${minifiedHtml}`
                        return res.send(minified);
                    })
                    .catch((err: Error) => {
                        console.log(err)
                        return res.send(data);
                    })
                    
                } catch (err) {
                    console.log(err)
                    return res.send(data);
                }
            } else {
                return res.send(data);
            }
        };
        next();
    }
}

// This middleware is used to correct the format of prices within emails that are sent to the client

export const formatCurrency = (amount, currency) => {
    if (amount === undefined || amount < 0) return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency }).format(0);

    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency }).format(amount);
}

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
}

export default () => {};
