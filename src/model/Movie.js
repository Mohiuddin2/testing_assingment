const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Released: {
    type: Date,
    required: true,
  },
  Genre: {
    type: String,
    requierd: true,
  },
  Director: {
    type: String,
    required: true,
  },
  UserRole: {
    type: String,
    required: true,
    enum: ["basic", "premium"],
  },

},{timestamps: true});

module.exports = mongoose.model("Movie", MovieSchema);