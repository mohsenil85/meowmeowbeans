var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./db');

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

login
  .get('/', function(req,res){
    console.log(req.flash());
    res.send({message: "get login page"});
  })
  .post('/', function(req, res){
    res.send({message: "post login page"});
  });

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
module.exports = login;
