var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes');
require('./util');

require('./auth.js')(passport);
var app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({ 
  secret: 'dkj2jk@*@&*&@#*@HJHJKDHSJjhsdjkhfk',
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(logger('dev'));

app
  .post('/auth', 
        passport.authenticate('auth'),
        function (req, res){
          console.log(req.user);
          //res.json({message: "login"});
          res.send(200);
        })
  .delete('/auth', function(req, res){
    console.log(req.user);
    if (req.user){
    req.logout();
    res.send(204) ;
    } else {
      //res.send({message : "Not logged int" });
      res.send(401);
    }
  })
  .get('/auth',  function(req, res){
    if(req.isAuthenticated()){
        console.log('loggedin')
      res.send(200);
    } else {
        console.log('notloggedin')
        res.send(401);
    }
  });

app.use(function(req, res, next){
    console.log(req.user)
    return next();
})

app.use(function(req, res, next){
    if (req.url === '/' || req.url.endsWith('.css') || req.url.startsWith('/fonts')) {
        return next();
    } else if (req.isAuthenticated()){
    return next();
  } else {
    //passport.authenticate('auth')
    console.log('foobar1000');
    //res.send(201)
    res.redirect('/auth');
  }
})

app.use('/api', routes);
app.use(express.static(__dirname + '/../dist'));
app.listen(8000);
