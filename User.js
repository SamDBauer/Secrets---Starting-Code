require('dotenv').config()
const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,

  },
  password: { type: String},
});

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User", userSchema);
