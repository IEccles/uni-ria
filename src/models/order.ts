'use strict';

import { Model } from 'sequelize';
import sequelize, { DataTypes } from '../database';
import { config as dotenv } from 'dotenv';

dotenv();

const Orders = (sequelize, DataTypes) => {
    class Orders extends Model {
        id: number;
        orderNumber: number;
        customerId: number;
        total: number;
        deliveryDate: Date;
        timeSlot: Date;
        createdAt: Date;
        updatedAt: Date;
    }

    Orders.init({
        id:{
            allowNull:false,
            type: DataTypes.INTEGER
        },
        orderNumber: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
        customerId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        total: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
        deliveryDate: {
            allowNull: false,
            type: DataTypes.DATE
        },
        timeSlot: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'Orders'
    })
    return Orders;
}

const model = Orders(sequelize, DataTypes)
export default model;