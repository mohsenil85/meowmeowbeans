var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = require('./api');
var login = require('./login');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('dev'));
app.use('/api', api);
app.use('/auth', login);
app.use(express.static(__dirname + '/../public'));

app.listen(8000);
