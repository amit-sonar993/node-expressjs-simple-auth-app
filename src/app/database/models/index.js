
const { dbConfig, env } = require("../../../config");
const {Sequelize, DataTypes} = require('sequelize')
const User = require('./user')

const dbConf = dbConfig[env]

const sequelize = new Sequelize(dbConf.database, dbConf.username, dbConf.password, {
  host: dbConf.host,
  dialect: dbConf.dialect /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

//checking if connection is done
sequelize.authenticate().then(() => {
  console.log(`Database connected to discover`)
}).catch((err) => {
  console.log(err)
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//connecting to model
db.User = User(sequelize, DataTypes)

module.exports = db;
