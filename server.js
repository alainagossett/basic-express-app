//Require Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Tweet = require('.models/tweet');

//Initialize Express
const app = express ();

const port = process.env.PORT || 3000;

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
app.get('/tweets', (req, res) => {
    Tweet.find({}, (err, arrayOfTweets) => {
        res.send(arrayOfTweets);
    }) //empty query object "{}" to look for all tweets
})

//New route

//Delete route
//put id in the param so we can specify which document we want to delete
app.delete('/tweets/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, (err, copyOfDeletedTweet) => {
        res.send(copyOfDeletedTweet);
    })
})

//Update route
//put id in param so we can specify which document we want to update
app.put('/tweets/:id', (req, res) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTweet) => {
        res.send(updatedTweet);
    })
})

//Create route
app.post('/tweets', (req, res) => {
    Tweet.create(req.body, (err, createdTweet) => {
        res.send(createdTweet);
    })//this code runs aynchronously
})

//Edit route

//Show route
//search by a specific document id
app.get('/tweets/:id', (req, res) => {
    Tweet.findById(req.params.id, (err, foundTweet) => {
        res.send(foundTweet);
    })
})


//Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log("express is listening on port ", PORT));