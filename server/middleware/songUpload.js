const util = require("util");
const multer = require("multer")
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();


const song = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },

    file: (req, file) => {
        return {
            bucketName: process.env.AUDIO_BUCKET,
            filename: `musica-${Date.now()}-${file.originalname}`
        }
    }
})

const audioUploadMiddleware = multer({
    storage: song,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("audio")) {
            cb(null, true)
        }
        else {
            console.log('only audio files supported')
            cb(null, false)
        }
    },
    // limits: {
    //     fileSize: 1024 * 1024 * 10
    // }
}).single('song')

const songUpload = util.promisify(audioUploadMiddleware)

module.exports = songUpload