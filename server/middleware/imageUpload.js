const util = require("util");
const multer = require("multer")
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();


// const image = new GridFsStorage({
//     url: process.env.MONGO_URI,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },

//     file: (req, file) => {
//         return {
//             bucketName: process.env.IMG_BUCKET,
//             filename: `musica-${Date.now()}-${file.originalname}`
//         }
//     }
// })
const image = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const imageUploadMiddleware = multer({
    storage: image,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("image")) {
            cb(null, true)
        }
        else {
            console.log('only image files supported')
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
}).single('image')

const imageUpload = util.promisify(imageUploadMiddleware)

module.exports = imageUpload