const moment = require('moment');

const databaseUpdate = (req, res, next) => {
  const currentDay = moment.utc().day();
  const currentHour = moment.utc().hour();
  /**
   *    if (has there been an update during this sat>UTC12-fri)
   *       dont update
   *     else 
   *       update
   */
  next();
}

module.exports = databaseUpdate;