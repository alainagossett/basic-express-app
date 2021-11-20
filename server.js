//Require Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

//Initialize Express
const app = express ();

require("dotenv").config()

mongoose.connect(process.env.MONGODB_URL)

//Set up mongodb event listeners
const db = mongoose.connection;


//Error/Success
db.on("error", (err) => console.log(err.message + "is mongoose running?"));
db.on("connected", () => console.log("mongoose connected"));
db.on("disconnected", () => console.log("mongoose disconnected"));

//Middleware
app.use(express.static("public"))

//Populates req.body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Use method override
app.use(methodOverride("_method"))

//Routes

//Index
app.get('/', (req, res) => {
    res.send("Hello World!")
})


//Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log("express is listening on port ", PORT));