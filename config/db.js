const { Sequelize } = require('sequelize');
const {DB_HOST,DB_NAME,DB_USER,DB_PASS} = process.env;
const conexion = new Sequelize(DB_NAME,DB_USER,DB_PASS,{
    host:DB_HOST,
    dialect:'mssql',
    dialectOptions: { 
        options: {
          encrypt: true,
          trustServerCertificate:true
        }
      }
});
module.exports = conexion;
// const mssql = require("mssql");
// require('dotenv').config({ path: './confing.env' });

// const db = async () => {
//   try {
//     // await mssql.connect(
//     //   "URI"
//     // );
//     await mssql.connect();
//     console.log("Remote DB connected");
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// };

// module.exports = db;
