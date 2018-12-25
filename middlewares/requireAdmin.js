const requireAdmin = (req, res, next) => {
  try {
    /**
     * checks if user is logged in, if user is loggin in, passport - which
     * runs before requireLogin - should have added a "user" property to req
     */
    if(!req.user.isAdminNow) {
      res.locals.type = 'clientErrorUnauthorized';
      throw new Error('You are not authorized to access this page. You are not an admin of this entity.')
    }
    next()
  } catch(err) {
    next(err);
  }

}

module.exports = requireAdmin;