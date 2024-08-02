const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Exercise = require("../model/exercises");
const e = require("express");

//Get Request to get all exercises
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /exercises",
  });
});

//Post Request to create execise

router.post("/", (req, res, next) => {
  const exercise = new Exercise({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    sets: req.body.sets,
  });
  exercise
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling Post requests to /exercises",
        createdExercise: result,
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
router.get("/:exerciseId", (req, res, next) => {
  const id = req.params.exerciseId;
  Exercise.findById(id)
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

//Post Request
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling Post requests to /exercises",
  });
});

//Patch request

router.patch("/:exerciseId", (req, res, next) => {
  res.status(200).json({
    message: "Updated exercise",
  });
});

//Delete request
router.delete("/:exerciseId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted exercise",
  });
});
module.exports = router;
