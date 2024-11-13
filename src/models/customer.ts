'use strict';

import { Model, Sequelize } from 'sequelize';
import sequelize, { DataTypes } from '../database';
import { validatePassword } from '../utils/validation';
import bcrypt from 'bcrypt';

const Customer = (sequelize, DataTypes) => {
  class Customer extends Model {
    firstName: string;
    surname: string;
    email: string;
    password:string;
    mobile: string;
    homePhone: string;
    addressLine1: string;
    addressLine2: string;
    county: string;
    postcode:string;
    createdAt:Date;
    updatedAt: Date;
    lastOrderedDate:Date;
    membershipStatus:number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }

    validatePassword = async function(password:string){
        return await bcrypt.compare(password, this.password);
    }
  }
  Customer.init({
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
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mobile: {
        type: DataTypes.STRING
      },
      homePhone: {
        type: DataTypes.STRING
      },
      addressLine1: {
        allowNull: false,
        type: DataTypes.STRING
      },
      addressLine2: {
        type: DataTypes.STRING
      },
      county: {
        allowNull: false,
        type: DataTypes.STRING
      },
      postCode: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastOrderedDate: {
        type: DataTypes.DATE
      },
      membershipStatus: {
        allowNull: false,
        type: DataTypes.TINYINT,
        defaultValue: 0
      }
  }, {
    hooks: {
        beforeCreate: async (customer) => {
          const salt = await bcrypt.genSalt();
          customer.password = await bcrypt.hash(customer.password, salt);
        },
        beforeUpdate: async (customer) => {
          if (customer.changed('password')) {
            const salt = await bcrypt.genSalt();
            customer.password = await bcrypt.hash(customer.password, salt);
          }
        }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};

const model = Customer(sequelize, DataTypes)
export default model;