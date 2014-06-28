var express = require('express');
var logger = require('morgan');
var api = require('./db');
var app = express();

app.use(logger('dev'));
app.use('/api', api);
app.use(express.static(__dirname + '/../public'));

app.listen(8000);
