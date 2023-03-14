
const { dbConfig, env } = require("../../config");
const Sequelize = require('Sequelize');

const dbConf = dbConfig[env]

const sequelize = new Sequelize(dbConf.database, dbConf.username, dbConf.password, {
  host: dbConf.host,
  dialect: dbConf.dialect /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require(“./tutorial.model.js”) (sequelize, Sequelize);

module.exports = db;
// The user should not forget to summon the sync() method in the server.js.
