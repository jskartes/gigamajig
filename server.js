const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
require('dotenv').config();
require('./config/database');
require('./config/passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const storesRouter = require('./routes/stores');
const servicesRouter = require('./routes/services');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/*===== PIPELINE =====*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  // Suppress deprecation warnings:
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stores', storesRouter);
app.use('/', servicesRouter);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
