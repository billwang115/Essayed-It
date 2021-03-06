const mongoose = require("mongoose");

const EditSchema = new mongoose.Schema({
  edit_comment: { type: String },
  assosiated_text: { type: String },
});

const EssaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  description: { type: String, required: true },
  topic: { type: String, required: true },
  type: { type: String, required: true },
  numCredits: { type: Number, required: true, min: 1, max: 5 },
  numWords: { type: Number },
  author: { type: String, required: true },
  editor: { type: String, required: false, default: null },
  edits: [EditSchema],
  edit_rating: { type: Number, min: 1, max: 5 },
  status: { type: String },
});

const Essay = mongoose.model("Essay", EssaySchema);
module.exports = { Essay };
