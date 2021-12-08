"use strict";
const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  username: { type: String, required: true },
  essays: { type: Array, required: true },
  essaysReviewed: { type: Array, required: true },
  score: { type: Number, required: true, default: 3},
  topics: { type: Array, required: true },
  credits: { type: Number, required: true },
});

MemberSchema.statics.findByUsername = async function (username) {
  const foundUser = await this.findOne({ username: username });
  if (!foundUser) {
    return Promise.reject("no user found");
  } else {
    return Promise.resolve(foundUser);
  }
};

const Member = mongoose.model("Member", MemberSchema);
module.exports = { Member };
