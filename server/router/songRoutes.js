const express = require("express");
const router = express.Router();
const song = require("../controller/songController")


router.get("/:id", song.playSong)

module.exports = router