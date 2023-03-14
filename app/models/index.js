
const { dbConfig } = require("../../config");
const Sequelize = require('Sequelize');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require(“./tutorial.model.js”) (sequelize, Sequelize);

module.exports = db;
// The user should not forget to summon the sync() method in the server.js.
