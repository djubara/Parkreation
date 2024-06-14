require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  // use localhost if db url is null
  host: process.env.DB_URL ? process.env.DB_URL : 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true,
  },
});
module.exports = sequelize;