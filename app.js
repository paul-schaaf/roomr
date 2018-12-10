const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();

mongoose.connect('mongodb://paul:ha95W4iYzUYVP8b@ds039175.mlab.com:39175/roomr-dev', { useNewUrlParser:true }).catch((err) => console.log(err.message));

app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(5000);