var mongoose = require('mongoose');
var User = require('./model')
var connection = mongoose.connect('mongodb://localhost/api');

var u = new User();
u.username = "bob",
u.password = u.generateHash("bob");
u.save(function(err, user){
    if (err) console.log(err);
    console.log('user ' + user.username + ' added to db');
});
var v = new User();
v.username = "frank",
v.password = u.generateHash("frank");
v.save(function(err, user){
    if (err) console.log(err);
    console.log('user ' + user.username + ' added to db');
});
