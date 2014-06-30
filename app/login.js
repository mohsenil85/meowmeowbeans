var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./model');

require('./auth.js')(passport);
var login = express();

login.use(cookieParser());

login.use(bodyParser.json());
login.use(bodyParser.urlencoded({
  extended: true
}));

login.use(session({ 
  secret: 'dkj2jk@*@&*&@#*@HJHJKDHSJjhsdjkhfk',
}));
login.use(passport.initialize());
login.use(passport.session());

login.use(flash());

login
  .post('/', 
        passport.authenticate('auth'),
        function (req, res){
          //console.log(req);
          res.json({message: "login"});
          res.send(200);
        })
  .delete('/', function(req, res){
    console.log(req.user);
    if (req.user){
    req.logout();
    res.send(204) ;
    } else {
      res.send({message : "Not logged int" });
      res.send(500);
    }
  })
  .get('/',  function(req, res){
    if(req.isAuthenticated()){
      res.send(200);
    } 
    res.send(401);
  });

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    console.log('this');
    return next();
  }
  console.log('that');
  res.redirect('/');
}
module.exports = login;
