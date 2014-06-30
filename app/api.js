var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var User = require('./db');

router.get('/', function(req, res){
  res.json({foo:"bar"});
})
.post('/', function(req, res){
  console.log(req.body);
  res.send(200);
});

router.route('/users')
  .post(function (req, res){
    console.log(req);
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = user.generateHash(req.body.password);
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

router.route('/users/:username')
  .get(function(req, res){
    User.findOne({username: req.params.username}, function(err, user){
      if(err) res.send(err);
      console.log(user);
      if (user){
        res.json(user);
      } else {
        res.send(404);
      }
    });
  })
  .post(function(req, res){
    User.findOne({username: req.params.username}, function(err, user){
      if(err) res.send(err);
      user.votes.push(req.body.vote);
      user.save(function(err){
        if(err) res.send(err);
        res.json({message: "Vote Added"});
      });
    });

  });


module.exports = router;
