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

    total_dur: {
        type: Number,
    },

    songs: {
        type: [Object]
    },

    // user_id: {
    //     type: String,
    //     require: true
    // }
}, { timestamps: true })

module.exports = mongoose.model('Playlist', playlistSchema)