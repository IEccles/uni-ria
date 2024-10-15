'use strict';

import { Model } from 'sequelize';
import sequelize, { DataTypes } from '../database';
const System = (sequelize, DataTypes) => {
  class System extends Model {

    id: number;
    key: string;
    value: string;
    description: string;
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
  System.init({
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['boolean', 'string', 'number']]
      }
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'System',
  });
  return System;
};

const model = System(sequelize, DataTypes)

model.create({
  key: 'show_emoji_in_email_from',
  description: 'Show an emoji in the name of the from in an email',
  type: 'boolean',
  value: '1'
}).catch((e) => {
  if (e.original.code !== 'ER_DUP_ENTRY') {
    console.log(e.original.code)
  }
})

model.create({
  key: 'emoji_to_show_in_email_from',
  description: 'The emoji that is shown in the from in an email',
  type: 'string',
  value: '📦'
}).catch((e) => {
  if (e.original.code !== 'ER_DUP_ENTRY') {
    console.log(e)
  }
})

model.create({
  key: 'currency_iso_4217',
  description: 'The currency symbol you want to show on Rooted Treasures using the ISO code.',
  type: 'string',
  value: 'GBP'
}).catch((e) => {
  if (e.original.code !== 'ER_DUP_ENTRY') {
    console.log(e)
  }
})

export default model;