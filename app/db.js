var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var connection = mongoose.connect('mongodb://localhost/api');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String
});

var user = mongoose.model('User', userSchema);

router.get('/', function(req, res){
  res.json({foo:"bar"});
});

module.exports = router;
