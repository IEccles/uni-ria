'use strict';

import { DecimalDataType, Model } from 'sequelize';
import sequelize, { DataTypes } from '../database';
import { config as dotenv } from 'dotenv';

dotenv();

const Products = (sequelize, DataTypes) => {
    class Products extends Model {
        id: number;
        name: string;
        stockCode: number;
        productCategory: string;
        barcodeNumber:string;
        stockCount: number;
        price:DecimalDataType
    }

    Products.init({
        id:{
            allowNull:false,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        stockCode: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        productCategory: {
            allowNull: false,
            type: DataTypes.STRING
        },
        barcodeNumber: {
            allowNull: false,
            type: DataTypes.STRING
        },
        stockCount: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        price: {
            allowNull:false,
            type: DataTypes.DecimalDataType
        }
    }, {
        sequelize,
        modelName: 'Products'
    })
    return Products;
}

const model = Products(sequelize, DataTypes)
export default model;