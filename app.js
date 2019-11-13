const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
// parse JSON
const bodyParser = require("body-parser");
// authenticate web tokens for user auth
const passport = require("passport");
// imports mongo cluster key
const db = require("./config/keys").mongoURI;

// import routes here
const accounts = require("./routes/api/accounts");
const assets = require("./routes/api/assets");
const prices = require("./routes/api/prices");
const users = require("./routes/api/users");

const app = express();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

// urlencoded allows us to parse external requests (e.g. Postman)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

// initial routes here, tries to match first arg, then will send the objects we are importing above from the routes/api folder
app.use("/api/accounts", accounts);
app.use("/api/assets", assets);
app.use("/api/prices", prices);
app.use("/api/users", users);

// app will run on Heroku || localhost:5000
const port = process.env.PORT || 5000;

// Express will start a socket and listen for connections on the path
app.listen(port, () => console.log(`Server is running on port ${port}`));
