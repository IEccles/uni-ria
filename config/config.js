const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "production": {
      "username": process.env.db_user,
      "password": process.env.db_password,
      "database": process.env.db_database,
      "host": process.env.db_host,
      "storage": process.env.db_storage,
      "dialect": process.env.db_dialect
    },
    "development": {
      "username": process.env.db_user,
      "password": process.env.db_password,
      "database": process.env.db_database,
      "host": process.env.db_host,
      "storage": process.env.db_storage,
      "dialect": process.env.db_dialect
    }
}