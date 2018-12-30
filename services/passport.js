const bcrypt = require('bcrypt');
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
    //if req.user exsits before passport assigns req.user, it logs out the previous req.user first
    if(req.user) {
      const user = req.user;
      user.activeEntity = 'none';
      user.isAdminNow = false;
      await user.save();
      req.logout();
    }
    try {
      const entity = await Entity.findOne({ name: req.body.entity });
      if (!entity) return done(null, false);
      const userInEntity = entity.users.find((user) => user.email === username);
      if (!userInEntity) return done(null, false);
      console.log(userInEntity);
      const match = await bcrypt.compare(password, userInEntity.password);
      if(!match) return done(null, false);
      let user = await User.findOne({ email: username });
      user.activeEntity = req.body.entity;
      user.isAdminNow = userInEntity.isAdmin;
      await user.save();
      user = await User.findOne({ email: username });
      return done(null, user);
    } catch(err) {
      return done(err); 
    }
  }
));
