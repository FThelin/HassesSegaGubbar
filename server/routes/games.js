const express = require("express");
const Game = require("../models/game");
const router = express.Router();

router.use(express.json());

//Find all games
router.get("/:season", async (req, res) => {
    try {
      const games = await Game.find({season: req.params.season});
      res.status(200).json(games);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
module.exports = router;