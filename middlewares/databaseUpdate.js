const moment = require('moment');
const mongoose = require('mongoose');
const Entity = mongoose.model('entities');

/**
 * This middleware makes all timeblocks in an entity available
 * once a login happens after Saturday 12:00 UTC. This makes it
 * possible for teams to start scheduling rooms ahead over the weekend
 * (after saturday 12UTC) and deletes last week's
 * reservations automatically.
 */

const databaseUpdate = async (req, res, next) => {
  /**
   * get time of last Update
   * and current Time
   */
  const entity = await Entity.findOne({ name: req.user.activeEntity });
  const date = entity.lastUpdated;
  const lastUpdated = moment(date).utc();
  const currentTime = moment.utc();

  /**
   * get Time of earliest possible last update
   * (which is last Saturday at 12:00 or
   * this Saturday at 12:00)
   */
  const getSaturdayTime = () => {
    const time = moment.utc();
    /**
     * if utc hour >= 12 so all timezones are surely
     * in saturday and have finished their work
     * and if saturday, lhe earliest possible update
     * was today at 12:00
     * 
     * if not saturday, get the start of the week 
     * (which is sunday 00:00), then subtract 1 day
     * and add 12 hours to again be on saturday 12:00
     */
    if (time.day() === 6 && time.hour() >= 12) {
      const lastSaturdayTime = time
        .startOf('day')
        .add(12, 'hours')
      return lastSaturdayTime;
    }
    const lastSaturdayTime = time
      .startOf('week')
      .subtract(1, 'days')
      .add(12, 'hours')
    return lastSaturdayTime;
  }
  const lastSaturdayTime = getSaturdayTime(); 
  /**
   * Check if there has been an update between
   * now and the earlierst possible update date for this
   * week, if there hasnt been an update, it is still required
   * so go ahead and update
   * 
   * else: do nothing
   */
  if (!(moment(lastUpdated).isBetween(lastSaturdayTime, currentTime, null, []))) {
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
      /**
       * inform mongoose of changes in database
       * and set lastUpdated to currentTime
       */
      await entity.markModified('rooms');
      entity.lastUpdated = moment.utc().toDate();
      await entity.markModified('lastUpdated');
      await entity.save();
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }

}

module.exports = databaseUpdate;