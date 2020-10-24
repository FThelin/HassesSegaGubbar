const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
  team: {
      type: String,
      required: true
  },
  season: {
      type: String,
      required: true
  },
  date: {
      type: String,
      required: true
  },
  motm: {
      type: String
  },
  result: {
      type: String
  },
  playerResult: {
    type: Array,
}
});

module.exports = mongoose.model("games", GameSchema);