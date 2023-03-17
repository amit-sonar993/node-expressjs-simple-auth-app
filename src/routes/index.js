var express = require('express');
var rootRouter = express.Router();
var auth = require('./auth');

rootRouter.use('/auth', auth);

module.exports = rootRouter;