import { CronJob } from 'cron';
import { Op } from 'sequelize';
import Stores from './models/store';

import Karrio from './integrations/karrio';
import Shopify from './integrations/shopify';

import { lock } from './routes/admin.routes'

// Define cronTime for different time intervals. 
//
// ┌───────────── minute (0–59)
// │ ┌───────────── hour (0–23)
// │ │ ┌───────────── day of the month (1–31)
// │ │ │ ┌───────────── month (1–12)
// │ │ │ │ ┌───────────── day of the week (0–6) (Sunday to Saturday)
// │ │ │ │ │
// │ │ │ │ │
// │ │ │ │ │
// * * * * * 

export const cronTime = {
    '1m': '*/1 * * * *',   // At every minute.
    '5m': '*/5 * * * *',   // At every 5th minute.
    '10m': '*/10 * * * *', // At every 10th minute.
    '15m': '*/15 * * * *', // At every 15th minute.
    '20m': '*/20 * * * *', // At every 20th minute.
    '25m': '*/25 * * * *', // At every 25th minute.

    '1h': '0 * * * *',     // At minute 0.
    '2h': '0 */2 * * *',   // At minute 0 past every 2nd hour.
    '3h': '0 */3 * * *',   // At minute 0 past every 3rd hour.
    '4h': '0 */4 * * *',   // At minute 0 past every 4th hour.
    '6h': '0 */6 * * *',   // At minute 0 past every 6th hour.
    '12h': '0 */12 * * *', // At minute 0 past every 12th hour.
    '1d': '0 0 * * *',     // At 00:00.

    'midnight': '0 0 * * *', // At 00:00.
    'noon': '0 12 * * *',    // At 12:00.
    'morning': '0 6 * * *',  // At 06:00.
    'evening': '0 18 * * *', // At 18:00.

    'mon': '0 0 * * 1',     // At 00:00 on Monday.
    'tue': '0 0 * * 2',     // At 00:00 on Tuesday.
    'wed': '0 0 * * 3',     // At 00:00 on Wednesday.
    'thu': '0 0 * * 4',     // At 00:00 on Thursday.
    'fri': '0 0 * * 5',     // At 00:00 on Friday.
    'sat': '0 0 * * 6',     // At 00:00 on Saturday.
    'sun': '0 0 * * 0',     // At 00:00 on Sunday.
}

// This job is used to get all the active couriers from Karrio API 
// and persist them to the database.

export const karrioJob = CronJob.from({
    cronTime: cronTime['1h'],
    onTick: async function () {
        const karrio = new Karrio();
        
        if (await karrio.authenticate()) {
            karrio.fetchCouriers()
                .then(couriers => {
                    karrio.parseCouriers(couriers)
                        .then(parsedCouriers => {
                            karrio.persistCouriers(parsedCouriers, true)
                        })
                        .catch(error => {
                            console.error(error);
                        })
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    timeZone: 'Europe/London'
})

export const syncOrdersJob = CronJob.from({
    cronTime: cronTime['10m'],
    onTick: async function () {

        if (lock.processingOrderSync) {
            return;
        }

        const stores = await Stores.findAll({
            where: {
                [Op.not]: [
                    {
                        integration: null
                    }
                ]
            }
        })

        for (let i = 0; i < stores.length; i++) {
            const store = stores[i];
            const lastSyncedAt = store.lastSyncedAt ? new Date(store.lastSyncedAt) : null;

            switch (store.integration) {
                case 'shopify':

                    if (lock.processingOrderBulkSync.includes(store.id)) {
                        continue;
                    }
                    
                    // eslint-disable-next-line no-case-declarations
                    const uuid = (store.eJson as {uuid: string}).uuid;
                    // eslint-disable-next-line no-case-declarations
                    const token = (store.eJson as {token: string}).token;
                    // eslint-disable-next-line no-case-declarations
                    const shopify = new Shopify(uuid, token, store.id);
                    
                    if (await shopify.authenticate()) {
                        lock.processingOrderBulkSync.push(store.id);
                        shopify.getOrders(false, lastSyncedAt)
                        .then(orders => {
                            lock.processingOrderBulkSync = lock.processingOrderBulkSync.filter(id => id !== store.id);
                            shopify.parseOrders(orders)
                            .then(parsedOrders => {
                                shopify.persistOrders(parsedOrders)
                                .then(() => {
                                    store.save();
                                })
                                .catch(error => {
                                    console.error(error);
                                })
                            })
                            .catch(error => {
                                console.error(error);
                            })
                        })
                        .catch(error => {
                            console.error(error);
                        })
                    }

                    break; 
                default:
                    console.error('Integration not found');
                    break;
            }
        }

    },
    timeZone: 'Europe/London'
})