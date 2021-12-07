"use strict";
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  username: { type: String, required: true },
  essays: { type: Array, required: true },
  score: { type: Number, required: true },
  topics: { type: Array, required: true },
  credits: { type: Number, required: true },
});

const Member = mongoose.model("Member", memberSchema);
module.exports = { Member };
