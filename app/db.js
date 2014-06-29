var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var connection = mongoose.connect('mongodb://localhost/api');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email : String,
  password: String,
  votes: Array
});


userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
   return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
