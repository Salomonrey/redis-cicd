var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose
.connect("mongodb://localhost:27017/redis_app",{ useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(async ()=>{
	console.log('MonogoDB Connected…')
})
.catch((error)=>{
	console.log('Error is', error);
})

require("./src/models/doctor");
require("./src/models/hospital");
require("./src/models/service");

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// if(process.env.NODE_ENV != "test") app.listen(3000, async () => { console.log('Listen port 3000') })
app.listen(3000, async () => { console.log('Listen port 3000') });

module.exports = app;
