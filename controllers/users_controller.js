const fs = require("fs");
const User = require('../models/userSchema');

const getFileContents = () => new Promise((resolve, reject) => {
  let data = '';
  const response = fs.createReadStream('./rooms.json');
  response.on('error', err => reject(err));
  response.on('data', (chunk) => {
    data += chunk.toString();
  });
  response.on('end', () => resolve(data));
});


module.exports = {

  getAllRooms: async (req, res) => {
    try {
      const data = await getFileContents();
      res.writeHead(200, {"Content-Type": "application/json"})
      res.end(data);
    } catch(err) {
      res.writeHead(404);
      res.end(err);
    }
  },

  createUser: async (req, res) => {
    const userProps = req.body;
    try {
      const user = await User.create(userProps);
      res.send(user);
    } catch(err) {
      res.send(err.message);
    }
  },

  createRoom: async (req, res) => {
    const roomProps = req.body;
    try {
      const user = await User.findOne({"email":"paulsimonschaaf@gmail.com"});
      if (user.rooms.every((room) => room.roomName !== `${roomProps.roomName}`)) {
        user.rooms.push(roomProps);
      } else {
        throw new Error(`There already is a room called: ${roomProps.roomName}`);
      }
      await user.save();

    } catch(err) {
      res.send(err.message);
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
  * }
  **/
}