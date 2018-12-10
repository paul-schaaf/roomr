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
  }
}