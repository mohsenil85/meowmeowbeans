var localStrategy = require('passport-local').Strategy;
var User  = require('./model');

module.exports = function(passport){
    console.log('1');
  passport.serializeUser(function(user, done){
    done(null, user.username);
  });

  passport.deserializeUser(function(name, done){
    console.log('3');
    User.findOne({username: name}, function (err, user){
      done(err, user);
    });
  });

  passport.use('auth', new localStrategy(
    function (username, password, done){
    process.nextTick(function(){
        User.findOne({username: username}, function(err, user){
    console.log('222222222222');
        if (err) {return done(err);}
        if(!user){
          return done(null, false, {message: 'Incorrect username'});
        }
        if(!user.validPassword(password)){
          return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
      });
    });
  }));


};//end mod.exports
