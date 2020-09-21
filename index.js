const express = require('express');
const authRoutes = require('./routes/authRoutes');
const {mongoURI, cookieKey} = require('./config/keys')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/user');
require('./services/passport');

mongoose.connect(mongoURI);

const app = express();
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60*1000,
    keys: [cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

 authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); 
 