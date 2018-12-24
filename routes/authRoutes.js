const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');

//logs in user, then redirects to /'entityName'
module.exports = app => {
  app.post('/api/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
      (req, res) => {
        res.redirect('/' + req.user.activeEntity);
      }
  );


  //changes user's activeEntity to "none" in mongo and then logs them out
  app.get('/api/logout', async (req, res) => {
    if (req.user) {
      const user = req.user;
      user.activeEntity = 'none';
      await user.save();
      req.logout();
    }
    res.redirect('/login');
  })
};