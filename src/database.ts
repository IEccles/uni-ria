import { Sequelize, DataTypes as DT } from 'sequelize';
import { config as dotenv } from 'dotenv';
dotenv();

export const DataTypes = DT;

const database = process.env.db_storage

// Configure the database connection in sequelize, sequelize is an ORM that is used to 
// interact with the database currently sequelize supports the following databases:
// Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server, Oracle Database, 
// Amazon Redshift and Snowflake’s Data Cloud. to learn more about setting up a database
// connection in sequelize, visit the following link:
// https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: database,
  logging: false
});

export default sequelize;