const PlayerResults = require("../models/playerResults");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  if (req.method === "PUT" || req.method === "DELETE") {
    const game = await PlayerResults.findOne({ _id: req.params.id });

    const user = await User.findOne({ _id: game.player });

    if (
      user.username === req.session.username ||
      req.session.role === "admin"
    ) {
      next();
    } else {
      res.status(401).send("Not authorized man");
    }
  } else if (req.method === "POST") {
    if (req.session) {
      next();
    } else {
      res.status(401).send("Not authorized");
    }
  }
};