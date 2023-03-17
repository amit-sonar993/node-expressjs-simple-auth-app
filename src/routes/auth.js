var express = require('express');
var router = express.Router();
var validate = require('./validation')
const authController = require('../app/controllers/auth.controller')

/* GET users listing. */
router.post('/register', validate('register'), authController.register);
router.post('/login', validate('login'), authController.login);

module.exports = router;
