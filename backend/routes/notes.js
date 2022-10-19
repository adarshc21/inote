const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1: Route for adding new notes
router.post(
  "/add",
  fetchUser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors);
    }

    try {
      const { title, description, tag } = req.body;
      const note = await Note.create({
        userid: req.userId,
        title: title,
        description: description,
        tag: tag,
      });
      res.send(note);
    } catch (error) {
      return res.status(500).send("Some internal error occured!");
    }
  }
);

// Route 2: Route for getting all notes of a user
router.get("/all", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ userid: req.userId });
    res.send(notes);
  } catch (error) {
    return res.status(404).send("notes not found");
  }
});

// Route 3: Route for updating note using id
router.put(
  "/update/:id",
  fetchUser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("note found");
    }

    if (String(note.userid) !== req.userId) {
      return res.status(400).send("unauthorized access denied");
    }

    try {
      const { title, description, tag } = req.body;
      const newNote = {};

      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      const note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { set: true }
      );

      res.send("Note updated successfully..");
    } catch (error) {
      return res.status(500).send("Some internal error occured!");
    }
  }
);

// Route 4: Route for deleting note using id
router.delete("/delete/:id", fetchUser, async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).send("note found");
  }

  if (String(note.userid) !== req.userId) {
    return res.status(400).send("unauthorized access denied");
  }

  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    res.send("Note deleted successfully..");
  } catch (error) {
    return res.status(500).send("internal issue");
  }
});

module.exports = router;
