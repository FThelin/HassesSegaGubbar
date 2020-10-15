const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

router.use(express.json());

// Register user
router.post("/register", async (req, res) => {
    console.log("inne")
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: password,
        role: "player",
      });
  
      const foundUser = await User.findOne({ username: req.body.username });
      if (!foundUser) {
        const newUser = await user.save();
        res.status(200).json(newUser);
      } else {
        res.status(403).send("User with that username already exist");
      }
    } catch (err) {
      res.json(err);
    }
  });

// Login user
router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
  
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json("Wrong username or password");
    }
  
    req.session.username = user.username;
    if (user.role === "admin") {
      req.session.role = "admin";
    } else {
      req.session.role = "player";
    }
  
    //Send response
    res.status(200).json(user);
  });

  module.exports = router;