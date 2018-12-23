const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = app => {
  app.post('/api/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
      async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        user.activeEntity = req.body.entityValue;
        await user.save();
        res.redirect('/');
      }
  );

  app.get('/api/logout', async (req, res) => {
    const user = req.user;
    user.activeEntity = 'none';
    await user.save();
    req.logout();
    res.redirect('/login');
  })
};