import cache from '../models/cache';
import { cacheSize } from '../utils/middleware';
import { Op } from 'sequelize';
import fs from 'fs';

const cacheDir = process.env.cache_dir || '.cache';
const cacheDisabled = process.env.cache === 'true' ? false : true;

// This function clears the cache for a specific endpoint
// and type, if the type is not specified, the default
// type will be 'dynamic'

export default function (endpoint, type = 'dynamic') {

    return;

    if (cacheDisabled) {
        return;
    }

    return new Promise<void>((resolve) => {
        if (!endpoint) {
            console.error('Endpoint is required to clear the cache');
            resolve();
        }
    
        if (endpoint === '*') {
            return cache.destroy({ where: { type } }).then(() => {
                const files = fs.readdirSync('./cache');
                for (let i = 0; i < files.length; i++) {
                    const file = `./${cacheDir}/${files[i]}`;
                    if (fs.existsSync(file)) {
                        cacheSize.decrement();
                        fs.unlinkSync(file);

                        if (i === files.length - 1) {
                            resolve();
                        }
                    } else {
                        if (i === files.length - 1) {
                            resolve();
                        }
                    }
                }
            })
            .catch((err: Error) => {
                console.error('There was an error clearing the cache: ', err.message);
                resolve();
            });
        }
    
        // Since some endpoints use params and also some endpoints
        // access the same database its best just to clear all the
        // cache that starts with the endpoint string.
    
        cache.findAll({ where: { 
            endpoint: {
                [Op.like]: `${endpoint}%`
            },
            type: type
        } }).then((results) => {
            if (results) {
                for (let i = 0; i < results.length; i++) {
                    const result = results[i];
                    const file = `./${cacheDir}/${result.hash}`;
    
                    // If the cache file exists, delete the file
                    // and destroy the cache record in the database.
    
                    result.destroy()
                    .then(async () => {
                        if (fs.existsSync(file)) {
                            cacheSize.decrement(); 
                            await fs.unlinkSync(file);

                            if (i === results.length - 1) {
                                resolve();
                            }
                        } else {
                            if (i === results.length - 1) {
                                resolve();
                            }
                        }
                    })
                    .catch((err: Error) => {
                        console.error('There was an error clearing the cache: ', err.message);
                        resolve();
                    });
                }
            } else {
                resolve();
            }
        })
        .catch((err: Error) => {
            console.error('There was an error clearing the cache: ', err.message);
            resolve();
        })
    })

}