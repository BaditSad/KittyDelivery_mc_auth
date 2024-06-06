const sql = require('mssql');
require('dotenv').config();

const sqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

const connectSQL = async () => {
  try {
    await sql.connect(sqlConfig);
    console.log('SQL Server connected...');
  } catch (err) {
    console.error('SQL Server connection error:', err);
  }
};

module.exports = {
  sql,
  connectSQL
};
