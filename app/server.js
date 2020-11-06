const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const gamesRoute = require("./routes/games");
const cookieSession = require("cookie-session");
const port = process.env.PORT || 5000;

const app = express();

app.use(
  cookieSession({
    secret: process.env.SECRET || "secretkey",
    maxAge: 1000 * 60 * 60,
    httpOnly: false,
    secureProxy: true,
  })
);

//CORS handling
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://www.hassessegagubbar.se/");
  res.header({
    "Access-Control-Allow-Origin": req.headers.origin,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  });
  next();
});

//Middlewares
app.use("/games", gamesRoute);
app.use("/users", usersRoute);

//Connect to database
const options = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect("mongodb+srv://FredrikThelin:Minora0805@cluster0.fab9t.mongodb.net/HassesSegaGubbar?retryWrites=true&w=majority", options, () => {
  console.log("Connected to database");
});

app.listen(port, () =>
  console.log("Express server up and running on port:", port)
);

module.exports = app;