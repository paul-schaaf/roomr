const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('users');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = await User.findOne({ "email": username });
    return done(null, user);
  }
));
