const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

router.use(express.json());

// Register user
router.post("/register", async (req, res) => {
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
  console.log(req.session)
  res.status(200).json(user);
});

//Logout user
router.post("/logout", async (req, res) => {
  try {
    console.log(req.session);
    req.session = null;
    console.log(req.session);
    res.status(200).send("Successfully logged out user");
  } catch {
    res.status(418).send("Could not log out user");
  }
});

// Update user password
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    console.log(req.body)

    const newPassword = await bcrypt.hash(req.body.password, 10);

    user.password = newPassword;

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
