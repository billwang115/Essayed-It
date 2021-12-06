"use strict";
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const memberSchema = new mongoose.Schema({
  userID: { type: ObjectId, required: true },
  essays: { type: Array, required: true },
  reviews: { type: Array, required: true },
});

const Member = mongoose.model("Member", memberSchema);
module.exports = { Member };
