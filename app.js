const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());

const getFileContents = () => new Promise((resolve, reject) => {
  let data = '';
  const response = fs.createReadStream('./rooms.json');
  response.on('error', err => reject(err));
  response.on('data', (chunk) => {
    data += chunk.toString();
  });
  response.on('end', () => resolve(data));
});



app.get('/', async (req, res) => {
  try {
    const data = await getFileContents();
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(data);
  } catch(err) {
    res.writeHead(404);
    res.end(err);
  }

})


app.listen(5000);