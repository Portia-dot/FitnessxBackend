const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
});

const setSchema = mongoose.Schema({
  setName: { type: String, required: true },
  exercises: [exerciseSchema],
});

const workoutSchema = mongoose.Schema({
  type: { type: String, required: true },
  totalDuration: { type: Number, required: true },
  sets: [setSchema],
  equipmentList: [{ type: String }],
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
