# Setup guide

## Setup requirement 
 - Node.js version = v18.14.2
 - Yarn version = 1.22.19

## Clone the project using
`git clone https://github.com/amit-sonar993/node-expressjs-simple-auth-app.git`

## Install dependencies
`yarn install`

## Create .env file and Copy the content of .env.example file and set the variable(s) name

## Creating the db

`npx sequelize-cli db:create`

## running the migration

`npx sequelize-cli db:migrate`

## To Run tests

`yarn test`