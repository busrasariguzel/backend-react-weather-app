const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "username is required",
    unique: "Username already exists, please choose another one",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  password: {
    type: String,
    required: "password is required",
  },
  userCreated: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
  expenses: [{ type: mongoose.Schema.ObjectId, ref: "Expense" }],
});

module.exports = mongoose.model("User", UserSchema);
