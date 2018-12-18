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

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.listen(port);