'use strict';

import { DecimalDataType, FloatDataType, Model } from 'sequelize';
import sequelize, { DataTypes } from '../database';
import { config as dotenv } from 'dotenv';

dotenv();

const Products = (sequelize, DataTypes) => {
    class Products extends Model {
        id: number;
        name: string;
        description: string;
        productCategory: string;
        barcode:string;
        stockCount: number;
        price: FloatDataType;
        image: Blob;
    }

    Products.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        productCategory: {
            allowNull: false,
            type: DataTypes.STRING
        },
        barcode: {
            allowNull: false,
            type: DataTypes.STRING
        },
        stockCount: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        price: {
            allowNull:false,
            type: DataTypes.FLOAT
        },
        image: {
            allowNull: true,
            type: DataTypes.BLOB
        }
    }, {
        sequelize,
        modelName: 'Products'
    })
    return Products;
}

const model = Products(sequelize, DataTypes)
export default model;