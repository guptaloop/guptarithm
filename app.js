const mongoose = require('mongoose');
// creates express server
const express = require("express");
const app = express();
// imports mongo cluster key
const db = require('./config/keys').mongoURI;
// imports routes from "<url>"
const users = require("./routes/api/users");
const accounts = require("./routes/api/accounts");
// parse JSON
const bodyParser = require('body-parser');
// authenticate web tokens for user auth
const passport = require('passport');

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

// urlencoded allows us to parse external requests (e.g. Postman)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);
// initial routes here, tries to match first arg, then will send the objects we are importing above from the routes/api folder
app.use("/api/users", users);
app.use("/api/accounts", accounts);
// app will run on Heroku || localhost:5000
const port = process.env.PORT || 5000;

// Express will start a socket and listen for connections on the path
app.listen(port, () => console.log(`Server is running on port ${port}`));
