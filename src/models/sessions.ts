'use strict';

import { Model } from 'sequelize';
import sequelize, { DataTypes } from '../database';

const Sessions = (sequelize, DataTypes) => {
  class Sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Sessions.init({
    sid: DataTypes.STRING,
    data: DataTypes.TEXT,
    expires: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Sessions',
  });
  return Sessions;
};

const model = Sessions(sequelize, DataTypes)

export default model;