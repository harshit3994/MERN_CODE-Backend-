const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

const db = require("./config/keys").database;

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Connect To MOngoDb
mongoose.connect(db).
then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Use Routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
