# UNI RIA
This is a full stack that uses handlebars, TypeScript and Sequelize.
The database is locally created on your machine and called database.sqlite. When new tables or columns are created/added you can update the database with the command `npm run migrate`

# Instructions for install
Node will need to be installed to run these commands. The instructions for node installation are here https://nodejs.org/en/download/package-manager

`git clone https://github.com/IEccles/uni-ria.git`

Once cloned cd into the repo:

`cd uni-ria`

Install dependencies:

`npm i`

## Create a .env file
Create a .env in the main directory. You can do this by copying and pasting the .env example.

You the need to generate a `session_secret` which can be any string value with no spaces. You will then generate an IV and Key. This is done by running the terminal command.

`npm run generate-keys`

This will create an IV and Key so copy and paste them into the cache IV and Key and into the normal Key and IV.

Run the dev version on your machine (this will automatically create the database and a login for you)

Windows:

`npm run dev:win`

Linux:

`npm run dev:linux`
