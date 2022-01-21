require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const User = require("./User");

mongoose.connect("mongodb://127.0.0.1:27017/userDB", () => {
  console.log("connected");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.get("/", (req, res) => {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ email: username }, function (err, foundUser) {
      if (
        !err &&
        foundUser.email === username &&
        foundUser.password === password
      ) {
        res.render("secrets");
      }
    });
  });

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: req.body.password,
    });
    newUser.save().then(
      () => console.log("User created"),
      res.render("secrets"),
      (e) => console.log(e.message)
    );
  });
