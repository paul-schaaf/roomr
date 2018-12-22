const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user);
  })
});

passport.use(new LocalStrategy({
  passReqToCallback:true
  },
  function(req, username, password, done) {
    User.findOne({ "email": username }, function (err, user) {
      if (err) return done(err); 
      if (req.body.entityValue !== "Roomr") return done(null, false);
      if (password !== "hello") return done(null, false);
      if (!user) return done(null, false);
      return done(null, user);
      }
    )
  }
));
