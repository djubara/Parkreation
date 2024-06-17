// require('dotenv').config();
// const Sequelize = require('sequelize');
// const sequelize = process.env.DB_URL ? new Sequelize(process.env.DB_URL, { dialect: 'postgres', dialectOption: { decimalNumbers: true } }) : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   // use localhost if db url is null
//   host: 'localhost',
//   dialect: 'postgres',
//   dialectOptions: {
//     decimalNumbers: true,
//   },
// });
// module.exports = sequelize;
require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize

sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_URL ?? 'localhost',
    dialect: 'postgres'
  },
);

module.exports = sequelize;