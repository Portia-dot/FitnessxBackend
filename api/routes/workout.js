const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = require("../model/workout");

// Get Request to get all exercises

router.get("/", (req, res, next) => {
  Workout.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Post Request to create execise

router.post("/", (req, res, next) => {
  const workout = new Workout({
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    totalDuration: req.body.totalDuration,
    sets: req.body.sets,
    equipmentList: req.body.equipmentList,
  });
  workout
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling Post requests to /workouts",
        createdWorkout: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Get request with a specific ID
router.get("/:workoutId", (req, res, next) => {
  const id = req.params.workoutId;
  console.log(id);
  Workout.findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    });
});

//Patch request

router.patch("/:workoutid", (req, res, next) => {
  const id = req.params.workoutid;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Workout.findByIdAndUpdate({ _id: id }, { $set: updateOps })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Delete request
router.delete("/:workoutid", (req, res, next) => {
  const id = req.params.workoutid;
  Workout.findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Deleted workout",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
