const User = require('../models/userSchema');

module.exports = {

  getAllRooms: async (req, res, next) => {
    try {
      const user = await User.findOne({"email":"paulsimonschaaf@gmail.com"});
      const data = user.rooms;
      for (let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].times.length; j++) {
          data[i].times[j].time = data[i].times[j].time.default;
          data[i].times[j].availability = data[i].times[j].availability.default;
        }
      }
      res.send(data);
    } catch(err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    const userProps = req.body;
    try {
      const user = await User.create(userProps);
      res.send(user);
    } catch(err) {
      next(err);
    }
  },

  createRoom: async (req, res, next) => {
    const roomProps = req.body;
    try {
      const user = await User.findOne({"email":"paulsimonschaaf@gmail.com"});
      const roomDoesNotExist = user.rooms.every((room) => room.roomName !== `${roomProps.roomName}`);
      if (roomDoesNotExist) {
        user.rooms.push(roomProps);
        res.send("added new room");
      } else {
        throw new Error(`There already is a room called: ${roomProps.roomName}`);
      }
      await user.save();

    } catch(err) {
      next(err);
    }
  }

  //TODO: implement deletion function, implement block time function, implement check time function
  //TODO: implement error handling with next and middleware in app.js instead of defining it for each controller function

  /**
  * deleteRoom: async (req, res) => {
  *   const roomProps = req.body;
  *   1. find room (roomProps);
  *   1a. throw error if that room doesnt exist
  *   2. delete room that was found in step 1;
  * }
  **/

  /**
  * blockRoom: async (req, res) => {
  *   const roomProps = req.body;
  *   1. find room (roomProps);
  *   1a. throw error if that room doesnt exist
  *   2. find timespan (roomProps);
  *   3. set availability of times in timespan to false;
  *   3a. throw error if any time availability is already set to false;
  * }
  **/

  /**
  * checkRoom: async (req, res) => {
  *   const roomProps = req.body;
  *   1. find room (roomProps);
  *   1a. throw error if that room doesnt exist         (THIS SHOULD MAYBE BE A FRONT-END FUNCTION);
  *   2. find timespan (roomProps);
  *   3. check if times in timespan are available
  *   3a. throw error if any time in timespan is not available
  * 
  *   // IF NO ROOM SPECIFIED, RETURN ALL TIMESPAN AND RESPECTIVE ROOMS THAT MEET REQUIREMENTS //
  * }
  **/
}