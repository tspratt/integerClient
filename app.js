var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var integersRouter = require('./routes/integers');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '_public')));

app.use('/', indexRouter);
app.use('/integers', integersRouter);

module.exports = app;
