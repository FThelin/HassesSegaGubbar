const express = require("express");
const Game = require("../models/game");
const PlayerResults = require("../models/playerResults")
const router = express.Router();
const restricted = require("./restricted");

router.use(express.json());

//Find all results
router.get("/results", async (req, res) => {
  try {
    const games = await PlayerResults.find().populate("game").populate("player");
    res.status(200).json(games);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Find all games
router.get("/:season", async (req, res) => {
  try {
    const games = await Game.find({season: req.params.season});
    res.status(200).json(games);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Post new result
router.post("/:game/:user", restricted, async (req, res) => {

  const pr = await PlayerResults.find({game: req.params.game, player: req.params.user})
  try {
    if (pr.length <= 0) {
      const gameResult = new PlayerResults({
        game: req.params.game,
        player: req.params.user,
        goals: req.body.goals,
        assists: req.body.assists,
        penalties: req.body.penalties,
      });
  
      const newResult = await gameResult.save();
      res.status(200).json(newResult)
    } else {
      res.status(400).json("Du har redan ett resultat för denna match")
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update result
router.put("/:id", restricted, async (req, res) => {
  try {
    const game = await PlayerResults.findOne({ _id: req.params.id });

    game.goals = req.body.goals;
    game.assists = req.body.assists;
    game.penalties = req.body.penalties;

    await game.save();

    res.json(game);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete result
router.delete("/:id", restricted, async (req, res) => {
  try {
    await PlayerResults.deleteOne({ _id: req.params.id });
    res.status(200).send("Results deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;