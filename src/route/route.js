const express = require("express");
const router = express.Router();
const { movie, getMovie } = require("../controller/movie");
const { protect} = require("../middleware/protect");
const { limitation } = require("../middleware/limit");

router.post("/movies", protect, limitation, movie)

router.get("/movies", protect, getMovie)


module.exports = router;
