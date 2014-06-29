var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

var connection = require('./db').connection;
var UserSchema = require('./db').UserSchema;
var User = require('./db').User;

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

module.exports = login;
/*
var connection = mongoose.connect('mongodb://localhost/api');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email : String,
  votes: Array
});

var User = mongoose.model('User', userSchema);

router.get('/', function(req, res){
  res.json({foo:"bar"});
});

router.route('/users')
  .post(function (req, res){
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.save(function(err){
      if (err) res.send(err);
      res.json({message: "User Created"});
    });
  })
  .get(function(req, res){
    User.find(function(err, users){
      if (err) res.send(err);
      res.send(users);
    });
  });

router.route('/users/:userName')
  .get(function(req, res){
    User.find({name: req.params.userName}, function(err, user){
      if(err) res.send(err);
      res.json(user);
    });
  })
  .post(function(req, res){
    User.findOne({name: req.params.userName}, function(err, user){
      if(err) res.send(err);
      var arr = user.votes;
      arr.push(req.body.vote);
      user.votes = arr;
      user.save(function(err){
        if(err) res.send(err);
        res.json({message: "Vote Added"});
      });
    });

  });

*/
