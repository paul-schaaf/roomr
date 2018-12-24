const requireLogin = (req, res, next) => {
  try {
    /**
     * checks if user is logged in, if user is loggin in, passport - which
     * runs before requireLogin - should have added a "user" property to req
     */
    if(!req.user) {
      res.locals.type = 'clientErrorUnauthorized';
      throw new Error('You are not authorized to access this page. Please log in first.')
    }

    /**
     * The previous check checks only whether a user is logged in. Once a user is logged in, he could try accessing
     * other members' info
     * This check makes sure that cannot happen by comparing the activeEntity aka the one he used to login with the entity
     * he is trying to access now
     *
     */
    if(req.user.activeEntity !== req.body.entity) {
      res.locals.type = 'clientErrorUnauthorized';
      throw new Error('You are trying to access an entity that you are currently not logged into.')
    }
    next()
  } catch(err) {
    next(err);
  }

}

module.exports = requireLogin;