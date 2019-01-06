const moment = require('moment');
const mongoose = require('mongoose');
const Entity = mongoose.model('entities');

const databaseUpdate = async (req, res, next) => {
  const currentDay = moment.utc().day();
  const currentHour = moment.utc().hour();
  /**
   *    if (has there been an update during this sat>UTC12-fri)
   *       dont update
   *     else 
   *       update
   */
  const entityName = req.user.activeEntity;
  try {
    const entity = await Entity.findOne({ name: entityName });
    if (!entity) {
      res.locals.type = 'clientError';
      throw new Error(`There is no entity called:${entityName}`);
    }
    const rooms = entity.rooms;
    /**
     * for each room,
     * for each day in each room,
     * for each time in each day in each room,
     * set the availability to true,
     * i.e. reset the database for the new week
     */
    for (let i = 0; i < rooms.length; i++) {
      for (let k = 0; k < rooms[i].days.length; k++) {
        for (let j = 0; j < rooms[i].days[k].length ; j += 1) {
          rooms[i].days[k][j].availability = true;
        }
      }
    }
    await entity.markModified('rooms');
    await entity.save();
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = databaseUpdate;