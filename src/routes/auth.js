var express = require('express');
var router = express.Router();
var validate = require('./validation')

/* GET users listing. */
router.post('/register', validate('register'), function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
