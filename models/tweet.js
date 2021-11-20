//Require Dependencies
const mongoose = require('mongoose');

//Define Schema
const tweetSchema = new mongoose.Schema({
    title: String,
    body: String,
    likes: { type: Number, default: 0},
    sponsored: { type: Boolean, default: false },
}, { timestamps: true })

//Compile Schema into a model
const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;