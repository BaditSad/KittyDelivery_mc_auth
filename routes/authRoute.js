const express = require('express');
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { refresh } = require('../controllers/refresh');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

module.exports = router;
