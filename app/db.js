var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();


var connection = mongoose.connect('mongodb://localhost/api');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String
});

var UserModel = mongoose.model('UserModel', userSchema);

router.get('/', function(req, res){
  res.json({foo:"bar"});
});

router.route('/users')
  .post(function (req, res){
    var user = new UserModel();
    user.name = req.body.name;
    user.save(function(err){
      if (err) res.send(err);
      res.json({message: "User Created"});
    });
  })
  .get(function(req, res){
    UserModel.find(function(err, users){
      if (err) res.send(err);
      res.send(users);
    });
  });

module.exports = router;
