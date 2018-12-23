const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Entity = mongoose.model('entities');
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
  usernameField: 'email',
  passReqToCallback:true
  },
  async (req, username, password, done) => {
    try {
      const entity = await Entity.findOne({ name: req.body.entity });
      if (!entity) return done(null, false);
      const userExists = entity.users.find((user) => user.email === username && user.password === password);
      if (!userExists) return done(null, false);
      const user = await User.findOne({ email: username });
      return done(null, user);
    } catch(err) {
      return done(err); 
    }
  }
));
