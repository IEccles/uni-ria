'use strict';

import { Model } from 'sequelize';
import sequelize, { DataTypes } from '../database';

const Cache = (sequelize, DataTypes) => {
  class Cache extends Model {

    id: number;
    hash: string;
    endpoint: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Cache.init({
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['static', 'dynamic']]
      }
    }
  }, {
    sequelize,
    modelName: 'Cache',
  });
  return Cache;
};

const model = Cache(sequelize, DataTypes)
export default model;