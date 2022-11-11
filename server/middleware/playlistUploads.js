const util = require("util");
const multer = require("multer")
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = multer.memoryStorage()

const playlistUploadMiddleware = multer({ storage }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'songs' }
]);

const playlistUpload = util.promisify(playlistUploadMiddleware)

module.exports = playlistUpload