var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = require('./routes');
var login = require('./login');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('dev'));
app.use('/api', routes);
app.use('/auth', login);
app.use(express.static(__dirname + '/../dist'));

app.listen(8000);
