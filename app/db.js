var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var connection = mongoose.connect('mongodb://localhost/api');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email : String,
  password: String,
  votes: Array
});

var User = mongoose.model('User', userSchema);

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
   return bcrypt.compareSync(password, this.local.password);
};

console.log(userSchema.methods.generateHash('pass'));
module.exports = mongoose.model('User', userSchema);
/*
module.exports = {
  connection: connection,
  userSchema: userSchema,
  User: User
};

*/
