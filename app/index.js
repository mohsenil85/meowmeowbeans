var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes');

require('./auth.js')(passport);
var app = express();

var connection = mongoose.connect('mongodb://localhost/api');


app.use(logger('dev'));
//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({secret: "lol"}));
app.use(passport.initialize());
app.use(passport.session());



app.use(function(req, res, next){
    console.log(req);
    return next();
});

app.use('/', routes);
//app.use(express.static(__dirname + '/../dist'));
app.listen(8000);
