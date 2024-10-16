# Creating a table

To create a table using sequelize you need to run this command to create the migration.
You can call this whatever you want as long as it works

`npx sequelize-cli migration:generate --name create-table`

Now that you have created a migration file it will appear in the folder migrations (wow who would've thought)
In this file you will create the table with its name, rows and datatypes. This is simpler than it sounds due to the Sequelize ORM.
Here is a basic example of a migration file for generating a person (not a real person)

```
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Human', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      middlename: {
        type: Sequelize.STRING
      }
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Human');
  }
};
```

# Note

Please always include the createdAt and updatedAt rows as these do come in handy and they are easily copy and pasted in every 
migration.

# Types

As you can see every row we created includes a type. This type can be a:
* STRING
* NUMBER
* INTEGER
* FLOAT
* DATE

We will use number other than when we create the row ID which has to be an INTEGER

# Allow Null

I'm sure you can guess what this does but in the database if we don't need the data like in this example middle name we can leave it blank and the database won't have a tantrum. However if we need some data like firstname we set allowNull to false which means the database needs that data and won't create an entry without it.

# Unique

This means that row entry has to be unique like an ID or email can only be used once in that table otherwise it's not unique

# What is up and down?

`async up` is what runs when you create a migration so when you run `npm run migrate` that will add the table or row to the database. Down removes what that up function does.

## Undo a migration

To undo a migration in Sequelize, you can use the Sequelize CLI to revert the last applied migration. Here are the steps:

Undo the Last Migration: To undo the last migration that was applied, run the following command:

`npx sequelize-cli db:migrate:undo`

Undo All Migrations: If you want to undo all migrations, you can run the following command repeatedly until all migrations are undone, or you can use the --to option to specify a migration to revert to:

`npx sequelize-cli db:migrate:undo:all`

Undo to a Specific Migration: To undo migrations up to a specific migration, use the `--to` option followed by the name of the migration file:

`npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-users.js`