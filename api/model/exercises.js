const mongoose = require("mongoose");

const setSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  setName: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true },
  reps: { type: Number, required: true },
});

const exerciseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  sets: [setSchema],
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
