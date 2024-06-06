const { sql } = require('../config/sql.config');

exports.getUsersFromSQL = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Users`;
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL query error:', err);
    res.status(500).send('Server error');
  }
};
