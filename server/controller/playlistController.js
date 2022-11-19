const Playlist = require('../model/playlistModel');
const Song = require('../model/songModel');
const playlistUpload = require('../middleware/playlistUploads');
const mongoose = require('mongoose');
const mm = require('music-metadata');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const { Readable } = require('stream');

//  to add a new playlist
exports.addNewPlaylist = async (req, res, next) => {

    await playlistUpload(req, res)

    const { name, description } = req.body

    const { image, songs } = req.files

    let uploadedSongs = [];
    let duration;
    let img;
    let img_info;
    let songs_info;


    if (!name) {
        res.status(400).json({ error: 'Your Playlist must have a name' })
    }

    if (!songs) {
        res.status(400).json({ error: 'At least one song must be added to the playlist' })
    }
    else {
        songs_info = await Promise.all(songs.map(song => addSongs(song)))
    }


    if (image) {
        img_info = await Promise.all(image.map(image => addImage(image)))
        img = await getImageId(img_info)
    }

    if (songs_info) {
        uploadedSongs = await getSongs(songs_info)
        duration = await getTotalDuration(songs_info)
    }


    if (uploadedSongs && duration) {

        try {
            const playlist = await Playlist.create({ name, description, image: img, duration, songs: uploadedSongs })
            res.status(200).json(playlist)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    next()

}

//  to delete a playlist
exports.deletePlaylist = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Playlist not found" })
    }

    const playlist = await Playlist.findOneAndDelete({ _id: id })

    if (!playlist) {
        return res.status(400).json({ error: "Playlist not found" })
    }

    res.status(200).json({ message: `${playlist.name} deleted successfully!!!` })
}

// to update a playlist name and description
exports.updatePlaylistInfo = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Playlist not found" })
    }

    const playlist = await Playlist.findOneAndUpdate({ _id: id }, { name: req.body.name, description: req.body.description }, { new: true })

    if (!playlist) {
        return res.status(400).json({ error: "Playlist not found" })
    }

    res.status(200).json({ message: `${playlist.name} info updated successfully!!!`, playlist })
}

//  to update a playlist cover photo
exports.updatePlaylistImage = async (req, res) => {

    await playlistUpload(req, res)

    const { id } = req.params

    let img_id = ''

    const { image } = req.files

    if (image) {
        img_info = await Promise.all(image.map(image => addImage(image)))
        img_id = await getImageId(img_info)
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Playlist not found" })
    }

    if (img_id) {
        const playlist = await Playlist.findOneAndUpdate({ _id: id }, { image: img_id }, { new: true })

        if (!playlist) {
            return res.status(400).json({ error: "Playlist not found" })
        }

        res.status(200).json({ message: `${playlist.name} cover updated successfully!!!`, playlist })
    }
}

//  to add songs to a playlist
exports.updatePlaylistSongs = async (req, res) => {

    await playlistUpload(req, res)

    const { id } = req.params

    const { songs } = req.files

    let uploadedSongs = [];
    let songs_info;
    let duration;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Playlist not found" })
    }

    if (!songs) {
        res.status(400).json({ error: 'At least one song must be added to the playlist' })
    }
    else {
        songs_info = await Promise.all(songs.map(song => addSongs(song)))
    }

    if (songs_info) {
        uploadedSongs = await getSongs(songs_info)
        duration = await getTotalDuration(songs_info)
    }

    const playlist = await Playlist.findById(id)

    if (!playlist) {
        return res.status(404).json({ error: "Playlist not found" })
    }
    else {

        const newSongs = playlist.songs

        uploadedSongs.forEach((songs) => {
            newSongs.push(songs)
        })

        const newDur = playlist.duration + duration

        const updatedPlaylist = await Playlist.findOneAndUpdate({ _id: id }, { songs: newSongs, duration: newDur }, { new: true })

        res.status(200).json({ message: `${playlist.name} info updated successfully!!!`, updatedPlaylist })

    }
}

//  to get all user playists
exports.getAllPlaylist = async (req, res) => {

    try {
        const playlists = await Playlist.find({}).sort({ createdAt: -1 })
        res.status(200).json(playlists)
    } catch (error) {
        if (res.status === 478) res.status(478).json({ error: 'Network Error' })
        else res.status(400).json({ error: error.message })
    }
}

//  to get a single playlist
exports.getPlaylist = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Playlist not found" })
    }

    const playlist = await Playlist.findById(id)

    if (!playlist) {
        return res.status(400).json({ error: "Playlist not found" })
    }

    else {
        const image = await readImage(playlist.image.img_id, playlist.image.format)

        res.status(200).json({
            id: playlist._id,
            name: playlist.name,
            description: playlist.description,
            image: image,
            duration: playlist.duration,
            songs: playlist.songs
        })
    }
}

// function to add songs to the database
const addSongs = async (song) => {

    return new Promise((resolve, reject) => {

        let song_id;
        let songErr_id;

        // Covert buffer to Readable Stream
        const songStream = new Readable();
        songStream.push(song.buffer);
        songStream.push(null);

        MongoClient.connect(process.env.MONGO_URI, (err, client) => {
            if (err) throw err
            db = client.db(process.env.MONGODB_NAME);

            let bucket = new mongodb.GridFSBucket(db, {
                bucketName: process.env.AUDIO_BUCKET
            });

            let uploadStream = bucket.openUploadStream(song.originalname);
            let id = uploadStream.id;
            songStream.pipe(uploadStream);

            uploadStream.on('error', () => {
                // bucket.delete(id);
                songErr_id = id
                reject({ error: `Error uploading audio file with id: ${id}`, id: songErr_id })
            });

            uploadStream.on('finish', () => {
                (async () => {
                    try {
                        const { common, format } = await mm.parseBuffer(song.buffer, { mimetype: song.mimetype }, { duration: true })
                        const { title, artists, artist, album, year, genre, picture } = common

                        let src;
                        picture.forEach((item) => {
                            src = `data:${item.format};base64,${item.data.toString('base64')}`;
                        })

                        const image = {
                            src: src,
                            format: picture.format,
                            type: picture.type
                        }

                        const { duration } = format

                        const new_song = await Song.create({ title, artists, artist, album, year, genre, duration: Math.round(duration * 1000), image: image, src: id })
                        song_id = id
                        resolve({
                            song_id: song_id, message: "Song successfully added", song: {
                                title: new_song.title,
                                artists: new_song.artists,
                                artist: new_song.artist,
                                album: new_song.album,
                                year: new_song.year,
                                genre: new_song.genre,
                                duration: new_song.duration,
                                image: new_song.image,
                                src: new_song.src,
                            }
                        })

                    } catch (error) {
                        console.error("Error is: " + error.message);
                    }
                })();
            });

        })
    }).then((result) => {
        return result
    }).catch((error) => {
        return error
    })
}

// function to add playlist cover to the database
const addImage = async (image) => {

    return new Promise((resolve, reject) => {

        let img_id;
        let imgErr_id;

        // Covert buffer to Readable Stream
        const imageStream = new Readable();
        imageStream.push(image.buffer);
        imageStream.push(null);

        MongoClient.connect(process.env.MONGO_URI, (err, client) => {
            if (err) throw err
            db = client.db(process.env.MONGODB_NAME);

            let bucket = new mongodb.GridFSBucket(db, {
                bucketName: process.env.IMG_BUCKET
            });

            let uploadStream = bucket.openUploadStream(image.originalname);
            let id = uploadStream.id;
            imageStream.pipe(uploadStream);

            uploadStream.on('error', () => {
                imgErr_id = id
                reject({ error: `Error uploading image file with id: ${id}`, id: imgErr_id })
            });

            uploadStream.on('finish', () => {
                img_id = id
                resolve({ img_id: img_id, mimetype: 'image/jpeg', message: `Image file successfully stored with id: ${id}` })
            });

        })
    }).then((result) => {
        return result
    }).catch((error) => {
        return error
    })
}

// function to read playlist cover to the database
const readImage = async (image_id, format) => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(process.env.MONGO_URI, (err, client) => {
            if (err) throw err
            db = client.db(process.env.MONGODB_NAME);

            let bucket = new mongodb.GridFSBucket(db, {
                bucketName: process.env.IMG_BUCKET
            });

            let downloadStream = bucket.openDownloadStream(image_id);

            downloadStream.on('data', (chunk) => {
                resolve(chunk)
            });

            downloadStream.on('error', () => {
                reject("Error reading image")
            });

            downloadStream.on('finish', () => {
                console.log('finished streaming')
            });

        })

    }).then((result) => {
        return `data:${format};base64,${result.toString('base64')}`
    }).catch((error) => {
        return error
    })
}

// function to return the duration of the playlist
const getTotalDuration = async (songs) => {

    let total_duration = 0;

    await songs.map((song) => {
        total_duration += song.song.duration
    })

    return total_duration

}

// function to get the songs IDs
const getSongs = async (songs) => {

    let allSong = []

    await songs.map((song) => {
        allSong.push(song.song)
    })

    return allSong

}

// function to get the image ID
const getImageId = async (image) => {

    let img_id;
    let format;

    await image.map((image) => {
        img_id = image.img_id
        format = image.mimetype
    })

    return { img_id, format }

}
