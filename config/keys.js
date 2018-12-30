// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  const prodKeys = require('./prod');
  module.exports = prodKeys;
} else {
  // we are in development - return the dev keys!!!
  const devKeys = require('./dev');
  module.exports = devKeys;
}
