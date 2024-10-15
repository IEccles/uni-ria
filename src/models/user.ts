'use strict';

import { Model } from 'sequelize';
import sequelize, { DataTypes } from '../database';
import { validatePassword } from '../utils/validation';
import bcrypt from 'bcrypt';
import { config as dotenv } from 'dotenv';

dotenv();

const User = (sequelize, DataTypes) => {
  class User extends Model {

    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: string[];
    active: boolean;
    twofa: string;
    lastActivity: Date;
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

    validatePassword = async function (password: string) {
      return await bcrypt.compare(password, this.password);
    }

  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isPassword(value: string) {
          const { pass } = validatePassword(value);
          if (!pass) {
            throw new Error('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 digit');
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roles: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: ['user']
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    twofa: DataTypes.STRING,
    lastActivity: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};

const model = User(sequelize, DataTypes)

if (process.env.NODE_ENV === 'development') {
  model.create({
    email: 'dev@rooted.co.uk',
    password: 'Password123',
    firstName: 'Dev',
    lastName: 'User',
    roles: ['user', 'admin']
  }).catch(() => {
    //console.error(err);
  });

  model.create({
    email: 'user@rooted.co.uk',
    password: 'Password123',
    firstName: 'Dev',
    lastName: 'User',
    roles: ['user']
  }).catch(() => {
    //console.error(err);
  });
}

export default model;