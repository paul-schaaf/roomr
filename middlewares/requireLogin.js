const requireLogin = (req, res, next) => {
  try {
    /**
     * checks if user is logged in, if user is loggin in, passport - which
     * runs before requireLogin - should have added a "user" property to req
     */
    if (!req.user) {
      res.locals.type = 'clientErrorUnauthorized';
      throw new Error('You are not authorized to access this page. Please log in first.');
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = requireLogin;
