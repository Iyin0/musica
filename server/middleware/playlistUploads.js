const util = require("util");
const multer = require("multer")
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },

    file: (req, file) => {

        if (file.mimetype.includes("audio")) {
            return {
                bucketName: process.env.AUDIO_BUCKET,
                filename: `musica-${Date.now()}-${file.originalname}`
            }
        }
        else if (file.mimetype.includes("image")) {
            return {
                bucketName: process.env.IMG_BUCKET,
                filename: `musica-${Date.now()}-${file.originalname}`
            }
        }
        else {
            console.log('only audio or audio files supported')
        }
    }
})


const playlistUploadMiddleware = multer({ storage }).fields([
    { name: 'image' },
    { name: 'song' }
]);

const playlistUpload = util.promisify(playlistUploadMiddleware)

module.exports = playlistUpload