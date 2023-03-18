var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var rootRouter = require('./routes');
const passport = require('passport')
const cors = require('cors');

var app = express();

app.use(logger('dev'));


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// passport initialization
app.use(passport.initialize());


app.use(rootRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log( `error ${err}`) // log the error
  const status = err.status || 500
  // send back an easily understandable error message to the caller
  res.status(status).send(err)
})

module.exports = app;
