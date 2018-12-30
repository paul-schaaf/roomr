const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/entityCollection/entitySchema');
require('./models/userCollection/userSchema');
require('./services/passport');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');


const port = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).catch();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)


app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
bookingRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client-roomr/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client-roomr', 'build', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  res.status(400).send({
    message: err.message,
    type: res.locals.type
  });
});

app.listen(port);
