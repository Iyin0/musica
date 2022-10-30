const Playlist = require('../model/playlistModel')
const imageUpload = require('../middleware/imageUpload')
const audioUpload = require('../middleware/songUpload')
const playlistUpload = require('../middleware/playlistUploads')
const mongoose = require('mongoose')

exports.addNewPlaylist = async (req, res, next) => {

    const { name, description, total_dur } = await req.body
    // await playlistUpload(req, res)
    await audioUpload(req, res)
    // await imageUpload(req, res)
    // console.log(req.file)
    let image = ""
    // const image = req.file.id
    if (req.file) image = req.file

    console.log(name, description, total_dur, image)

    // try {
    //     const playlist = await Playlist.create({ name, description, image, total_dur })
    //     res.status(200).json(playlist)
    // } catch (error) {
    //     res.status(400).json({ error: error.message })
    // }

    next()
}

exports.deletePlaylist = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Playlist not found" })
    }

    const playlist = await Playlist.findOneAndDelete({ _id: id })

    if (!playlist) {
        return res.status(400).json({ error: "Playlist not found" })
    }

    res.status(200).json(playlist)
}

exports.updatePlaylist = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Playlist not found" })
    }

    const playlist = await Playlist.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!playlist) {
        return res.status(400).json({ error: "Playlist not found" })
    }

    res.status(200).json(playlist)
}

exports.getAllPlaylist = async (req, res) => {

    try {
        const playlists = await Playlist.find({}).sort({ createdAt: -1 })
        res.status(200).json(playlists)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getPlaylist = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Playlist not found" })
    }

    const playlist = await Playlist.findById(id)

    if (!playlist) {
        return res.status(404).json({ error: "Playlist not found" })
    }

    res.status(200).json(playlist)
}