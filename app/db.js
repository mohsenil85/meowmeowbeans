var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var connection = mongoose.connect('mongodb://localhost/api');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email : String,
  votes: Array
});

var User = mongoose.model('User', userSchema);
module.exports = {
  connection: connection,
  userSchema: userSchema,
  User: User
};
