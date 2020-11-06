const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const gamesRoute = require("./routes/games");
const session = require('express-session')
const port = process.env.PORT || 5000;
const MongoStore = require('connect-mongo')(session);
const cors = require("cors");

const app = express();

//Express session
app.use(session({
  secret: 'my cats name again',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,    
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  }
}))

//CORS handling
app.use(cors({origin: "https://blissful-goldwasser-54cf6f.netlify.app/", credentials: true, methods: "GET,POST,PUT,DELETE,OPTIONS"}));

app.all('*', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.set('trust proxy', 1)

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