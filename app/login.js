var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var request = require('request');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./db');

require('./auth.js')(passport);
var login = express();

login.use(session({ 
  secret: 'dkj2jk@*@&*&@#*@HJHJKDHSJjhsdjkhfk',
  //um what the fuck do these do?
  saveUninitialized: true,
  resave: true
}));
login.use(passport.initialize());
login.use(passport.session());
login.use(flash());
login.use(bodyParser.json());
login.use(bodyParser.urlencoded({
  extended: true
}));

login
  .post('/', 
        passport.authenticate('auth'),
        function (req, res){
          res.send(200);
  });

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
module.exports = login;
