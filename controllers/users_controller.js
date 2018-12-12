const User = require('../models/userSchema');

const timeArray = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00"
]

module.exports = {

  getAllRooms: async (req, res, next) => {
    try {
      const user = await User.findOne({"email":"paulsimonschaaf@gmail.com"});
      const rooms = user.rooms.slice();
      /*
      * mongodb saves time and availability values in their respective default properties that are set in
      * roomSubSchema.js. When i send that data to the client, the client does not need to know about this structure
      * so I just the time value to be the time.default value, saving the client some work
      */
      /*for (let i = 0; i < rooms.length; i++) {
        for(let j = 0; j < rooms[i].times.length; j++) {
          rooms[i].times[j].time = rooms[i].times[j].time.default;
          rooms[i].times[j].availability = rooms[i].times[j].availability.default;
        }
      } */
      res.send(rooms);
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
      const roomDoesNotExist = user.rooms.every((room) => room.roomName !== roomProps.roomName);
      if (roomDoesNotExist) {
        user.rooms.push(roomProps);
        await user.save();
        res.send(`Room: ${roomProps.roomName} successfully added`);
      } else {
        throw new Error(`There already is a room called: ${roomProps.roomName}`);
      }
    } catch(err) {
      next(err);
    }
  },

  //TODO:  implement block time function, implement check time function

  deleteRoom: async (req, res, next) => {
    const roomName = req.params.id;
    try {
      const user = await User.findOne({"email":"paulsimonschaaf@gmail.com"});
      const roomToDeleteArray = user.rooms.filter((room) => room.roomName === roomName);
      if (roomToDeleteArray.length === 1) {
        const roomToDelete = roomToDeleteArray[0];
        const index = user.rooms.indexOf(roomToDelete);
        user.rooms.splice(index, 1);
        await user.save();
        res.send(`Room: ${roomName} successfully deleted`);
      } else {
        throw new Error(`There is no room called: ${roomName}`);
      }
    } catch(err) {
      next(err);
    }
  },

  blockRoom: async (req, res, next) => {
    const roomProps = req.body;
    try {
      const user = await User.findOne({"email":"paulsimonschaaf@gmail.com"});
      const room = user.rooms.find((room) => room.roomName === roomProps.roomName);
      if (room) {
        const indexStart = timeArray.indexOf(roomProps.start);
        const indexEnd = timeArray.indexOf(roomProps.end);
        for (let i = indexStart; i < indexEnd; i++) {
          if (room.times[i].availability === false) {
            throw new Error(`This room is already at least partly reserved for the timespan you selected`);
          }
        }
        for (let i = indexStart; i < indexEnd; i++) {
          room.times.set(i, {"time":{"default":timeArray[i]}, "availability": "false"});
          room.times[i].availability = false;
        }
        await user.save();
        res.send(room);
      } else {
        throw new Error(`There is no room called ${roomProps.roomName}`);
      }
      
    } catch(err) {
      next(err);
    } 
  }
  
  

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