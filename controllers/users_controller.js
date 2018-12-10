const fs = require("fs");

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
  getAll: async (req, res) => {
    try {
      const data = await getFileContents();
      res.writeHead(200, {"Content-Type": "application/json"})
      res.end(data);
    } catch(err) {
      res.writeHead(404);
      res.end(err);
    }
  }
}