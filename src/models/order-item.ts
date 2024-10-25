import { Model } from 'sequelize';
import sequelize, { DataTypes } from '../database';
import { config as dotenv } from 'dotenv';

dotenv();

const OrderItems = (sequelize, DataTypes) => {
    class OrderItems extends Model {
        id: number;
        orderId: number;
        productId: number;
        shippingDate: Date;
        trackingNumber: number;
    }

    OrderItems.init({
        id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        orderIdId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        productId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        shippingDate: {
            allowNull: false,
            type: DataTypes.DATE
        },
        trackingNumber: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'OrderItems'
    })
    return OrderItems;
}

const model = OrderItems(sequelize, DataTypes)
export default model;