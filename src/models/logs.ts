'use strict';
import {
  Model
} from 'sequelize';
import sequelize, { DataTypes } from '../database';

const Logs = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Logs.belongsTo(models.Users, {
        foreignKey: 'user',
        as: 'userLog'
      });
    }
  }
  Logs.init({
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    log: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Logs',
  });
  return Logs;
};

const model = Logs(sequelize, DataTypes)
export default model;