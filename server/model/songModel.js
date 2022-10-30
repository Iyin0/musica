const mongoose = require("mongoose")
const Schema = mongoose.Schema

const songSchema = new Schema({
    title: {
        type: String,
    },

    artist: {
        type: String
    },

    album: {
        type: String
    },

    genre: {
        type: String
    },

    image: {
        type: String
    },

    size: {
        type: String
    },

    duration: {
        type: Number
    },

    src: {
        type: String
    },

    playlist_id: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Song', songSchema)