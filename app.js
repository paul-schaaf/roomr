const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://paul:ha95W4iYzUYVP8b@ds039175.mlab.com:39175/roomr-dev', { useNewUrlParser:true }).catch((err) => console.log(err.message));

const app = express();

app.use(cors());
app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
  res.send(err.message);
});

app.listen(port);