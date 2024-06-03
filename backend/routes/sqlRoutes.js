const express = require('express');
const { getUsersFromSQL } = require('../controllers/sqlController');

const router = express.Router();

router.get('/users', getUsersFromSQL);

module.exports = router;
