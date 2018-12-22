const requireLogin = (req, res, next) => {
  try {
    if(!req.user) {
      throw new Error('You are not authorized to access this page. Please log in first.')
    }
    next()
  } catch(err) {
    next(err);
  }

}

module.exports = requireLogin;