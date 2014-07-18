var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var passport = require('passport');

var routes = require('./routes');

var app = express();

var connection = mongoose.connect('mongodb://localhost/api');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({secret: "lol"}));
app.use(passport.initialize());
app.use(passport.session());



/*
app.use(function(req, res, next){
    console.log(req);
    return next();
});

*/
app.use('/api', routes);
app.use(express.static(__dirname + '/../public'));
app.listen(8000);
