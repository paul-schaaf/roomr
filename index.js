const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const routes = require('./routes/routes');


const port = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).catch();

const app = express();

app.use(bodyParser.json());

routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client-roomr/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client-roomr', 'build', 'index.html'));
  });
}

app.use((err, req, res) => {
  res.status(400).send(err.message);
});

app.listen(port);
