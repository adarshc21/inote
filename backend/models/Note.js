const mongoose = require("mongoose");
const {Schema} = mongoose;

const NoteSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: "general"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;