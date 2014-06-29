var localStrategy = require('passport-local').Strategy;
var User  = require('./db');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    console.log('bar');
    done(null, user.name);
  });

  passport.deserializeUser(function(name, done){
    User.find({name: name}, function (err, user){
      console.log('foo');
      done(err, user);
    });
  });

  passport.use('auth', new localStrategy(
    function (username, password, done){
      User.findOne({name: username}, function(err, user){
      if (err) {return done(err);}
      if(!user){
        return done(null, false, {message: 'Incorrect username'});
      }
      if(!user.validPassword(password)){
        return done(null, false, {message: 'Incorrect password'});
      }
      console.log(username);
      return done(null, user);
    });
  }));

  passport.use('signup', new localStrategy(
    function(username, password, done){
    User.findOne({name: username}, function(err, user){
      if (err) {return done(err);}
      if (user) {
        return done(null, false, 
                    {message: 'Username taken'});
      } else {
        var newUser = new User();
        newUser.name = username;
        newUser.password = newUser.generateHash(password);
        newUser.save(function(err){
          if (err) throw err;
          return done(null, newUser);
        });
      }

    });
  }
  ));


};//end mod.exports
