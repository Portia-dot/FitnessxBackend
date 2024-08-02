const express = require("express");

const router = express.Router();
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /exercises",
  });
});

//Post Request to create execise

router.post("/", (req, res, next) => {
  const exercise = {
    name: req.body.name,
    sets: req.body.sets.map((set) => ({
      setName: set.setName,
      description: set.description,
      instructions: set.instructions,
      reps: set.reps,
    })),
  };
  res.status(200).json({
    message: "Handling Post requests to /exercises",
    createdExercise: exercise,
  });
});

//Get request with a specific ID
router.get("/:exerciseId", (req, res, next) => {
  const id = req.params.exerciseId;
  if (id == "abs") {
    res.status(200).json({
      message: "You discovered the special ID",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You passed an an execise ID",
    });
  }
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
