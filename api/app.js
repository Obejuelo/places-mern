const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const db = require('./config/database');

let app = express();
db.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/places', require('./routes/places'));
app.use('/users', require('./routes/users'));
app.use('/session', require('./routes/session'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.json({err});
});

module.exports = app;

