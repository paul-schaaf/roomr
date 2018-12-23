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
  async (req, username, password, done) => {
    try {
      const user = await User.findOne({ "email": username });
      if (req.body.entityValue !== "Roomr") return done(null, false);
      if (password !== "hello") return done(null, false);
      if (!user) return done(null, false);
      return done(null, user);
    } catch(err) {
      return done(err); 
    }
  }
));
