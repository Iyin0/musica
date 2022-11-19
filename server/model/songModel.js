const mongoose = require("mongoose")
const Schema = mongoose.Schema

const songSchema = new Schema({
    title: {
        type: String,
    },

    artist: {
        type: String
    },

    artists: {
        type: [String]
    },

    album: {
        type: String
    },

    year: {
        type: String
    },

    genre: {
        type: [String]
    },

    image: {
        type: Object
    },

    duration: {
        type: Number
    },

    src: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Song', songSchema)