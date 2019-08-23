const mongoose = require('mongoose');
// creates express server
const express = require("express");
const app = express();
// imports mongo cluster key
const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello Roman"));
// app will run on Heroku || localhost:5000
const port = process.env.PORT || 5000;

// Express will start a socket and listen for connections on the path
app.listen(port, () => console.log(`Server is running on port ${port}`));
