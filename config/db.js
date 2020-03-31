const mssql = require("mssql");
// require('dotenv').config({ path: './confing.env' });

const db = async () => {
  try {
    // await mssql.connect(
    //   "URI"
    // );
    await mssql.connect(process.env.DB_URI);
    console.log("Remote DB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = db;
