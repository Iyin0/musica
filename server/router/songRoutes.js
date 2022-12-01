const express = require("express");
const router = express.Router();
const song = require("../controller/songController")
const requireAuth = require('../middleware/requireAuth')


router.use(requireAuth) //  require auth for all routes
router.get("/", song.getAllSongs)
router.get("/genre", song.getAllGenre)
router.get("/genre/sort", song.getGenreSongs)
router.get("/:id", song.playSong)

module.exports = router