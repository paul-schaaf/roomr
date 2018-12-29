const passport = require('passport');
const mongoose = require('mongoose');

//logs in user, then redirects to /'entityName' or /'entityName/admin' if user is an admin
module.exports = app => {
  app.post('/api/login',
    passport.authenticate('local', { failureRedirect: '/login/loginFail' }),
      (req, res) => {
        if(req.user.isAdminNow){
          res.redirect('/app/' + req.user.activeEntity + '/admin');
        } else {
          res.redirect('/app/' + req.user.activeEntity);
        }
      }
  );

  //changes user's activeEntity to "none" in mongo and then logs them out
  app.get('/api/logout', async (req, res) => {
    if (req.user) {
      const user = req.user;
      user.activeEntity = 'none';
      user.isAdminNow = false;
      await user.save();
      await req.logout();
    }
    res.redirect('/login');
  })
};