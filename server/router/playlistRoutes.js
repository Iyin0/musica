const express = require("express");
const router = express.Router();
const playlist = require("../controller/playlistController")
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth) //  require auth for all routes
router.post("/", playlist.addNewPlaylist)
router.patch("/info/:id", playlist.updatePlaylistInfo)
router.patch("/image/:id", playlist.updatePlaylistImage)
router.patch("/songs/:id", playlist.updatePlaylistSongs)
router.delete("/:id", playlist.deletePlaylist)
router.get("/", playlist.getAllPlaylist)
router.get("/:id", playlist.getPlaylist)

module.exports = router