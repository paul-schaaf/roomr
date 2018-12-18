const keys = require('./config/keys');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const port = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI, { useNewUrlParser:true }).catch((err) => console.log(err.message));

const app = express();

app.use(cors());
app.use(bodyParser.json());

routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client-roomr/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client-roomr', 'build', 'index.html'));
  })
  
}

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.listen(port);