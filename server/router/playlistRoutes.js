const express = require("express");
const router = express.Router();
const playlist = require("../controller/playlistController")
// const playlistUpload = require('../middleware/playlistUploads')


router.post("/", playlist.addNewPlaylist)
router.patch("/:id", playlist.updatePlaylist)
router.delete("/:id", playlist.deletePlaylist)
router.get("/", playlist.getAllPlaylist)
router.get("/:id", playlist.getPlaylist)

module.exports = router