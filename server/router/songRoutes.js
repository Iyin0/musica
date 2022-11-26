const express = require("express");
const router = express.Router();
const song = require("../controller/songController")
const requireAuth = require('../middleware/requireAuth')


router.use(requireAuth) //  require auth for all routes
router.get("/:id", song.playSong)

module.exports = router