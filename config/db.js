const { Sequelize } = require("sequelize");
const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;
const conexion = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
  logging: false,
});
module.exports = conexion;
