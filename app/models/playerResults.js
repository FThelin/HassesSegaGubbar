const mongoose = require("mongoose");

const PlayerResultsSchema = mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "games",
  },
  goals: {
    type: Number
  },
  assists: {
    type: Number
  },
  penalties: {
    type: Number
  }  
});

module.exports = mongoose.model("playerresults", PlayerResultsSchema);