"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isAlphanumeric,
      message: "can only contain alphanumeric characters",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

UserSchema.pre("save", async function (next) {
  // checks to ensure we don't hash password more than once
  if (this.isModified("password")) {
    // generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } else {
    next();
  }
});

UserSchema.statics.findUserByUsernamePassword = async function (
  username,
  password
) {
  const foundUser = await this.findOne({ username: username });

  if (!foundUser) {
    return Promise.reject("no user found");
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);
  return isMatch
    ? Promise.resolve(foundUser)
    : Promise.reject("Passwords do not match");
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
