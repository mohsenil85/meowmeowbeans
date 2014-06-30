var localStrategy = require('passport-local').Strategy;
var User  = require('./db');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user.username);
  });

  passport.deserializeUser(function(name, done){
    User.findOne({username: name}, function (err, user){
      done(err, user);
    });
  });

  passport.use('auth', new localStrategy(
    function (username, password, done){
      User.findOne({username: username}, function(err, user){
      if (err) {return done(err);}
      if(!user){
        return done(null, false, {message: 'Incorrect username'});
      }
      if(!user.validPassword(password)){
        return done(null, false, {message: 'Incorrect password'});
      }
      return done(null, user);
    });
  }));


};//end mod.exports
