const mongoose = require("mongoose")

const Schema = mongoose.Schema

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    user_id: {
        type: String
    },

    image: {
        type: String
    },

    total_dur: {
        type: Number,
    }
}, { timestamps: true })

module.exports = mongoose.model('Playlist', playlistSchema)