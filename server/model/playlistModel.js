const mongoose = require("mongoose")

const Schema = mongoose.Schema

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ''
    },

    image: {
        type: Object,
        default: ''
    },

    duration: {
        type: Number,
    },

    songs: {
        type: [Object]
    },

    likes: {
        type: Number,
        default: 0
    },

    user_id: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Playlist', playlistSchema)