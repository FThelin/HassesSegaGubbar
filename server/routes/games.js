const express = require("express");
const Game = require("../models/game");
const User = require("../models/user");
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


//Update result
router.put("/:id/:userId", async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: req.params.userId })

    let userExist = false;
    
    const result = {
      goals: req.body.goals,
      assists: req.body.assists,
      penalties: req.body.penalties,
      player: user.name
    }

    for (let i = 0; i < game.playerResult.length; i++) {      
      if (game.playerResult[i].player === user.name) {
      game.playerResult[i].goals = result.goals
      game.playerResult[i].assists = result.assists
      game.playerResult[i].penalties = result.penalties
      userExist = true;
      }
    }

    if (userExist === false) {        
          game.playerResult.push(result)        
    }

      game.markModified('playerResult')
      await game.save();
  
      res.json(game);
  
  } catch (err) {
    res.status(400).json(err);
  }
});

  
module.exports = router;