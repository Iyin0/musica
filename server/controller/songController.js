const Song = require('../model/songModel');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const { Readable } = require('stream');
const ObjectID = require('mongodb').ObjectID;

let db;
MongoClient.connect(process.env.MONGO_URI, (err, client) => {
    if (err) throw err
    db = client.db(process.env.MONGODB_NAME);
})


//  to play a single song
exports.playSong = async (req, res) => {

    let id;

    try {
        id = new ObjectID(req.params.id)
    } catch (error) {
        res.status(400).json({ error: 'Invalid id parameter. Must be a single String of 12 bytes or a string of 24 hex characters' })
    }

    res.set('content-type', 'audio/mpeg');
    res.set('accept-ranges', 'bytes');

    let bucket = new mongodb.GridFSBucket(db, {
        bucketName: process.env.AUDIO_BUCKET
    });

    let downloadStream = bucket.openDownloadStream(id);

    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });
}


//  to get all songs
exports.getAllSongs = async (req, res, next) => {

    try {
        const songs = await Song.find({}).sort({ createdAt: -1 })
        const { allSongs } = await querySongLibrary(songs)
        res.status(200).json(allSongs)
    } catch (error) {
        res.status(400).json({ error: "Unable to Fetch Songs" })
    }

    next()
}

//  to get all song genre
exports.getAllGenre = async (req, res, next) => {

    try {
        const songs = await Song.find({}).sort({ createdAt: -1 })
        const { genre } = await querySongLibrary(songs)
        if (genre) res.status(200).json(genre)
        else res.status(400).json({ error: "Unable to Fetch Genre" })
    } catch (error) {
        res.status(400).json({ error: "Unable to Fetch Genre" })
    }

    next()
}

//  to get all songs of particular genre
exports.getGenreSongs = async (req, res, next) => {

    try {
        const songs = await Song.find({}).sort({ createdAt: -1 })
        const { genreSort } = await querySongLibrary(songs)
        if (genreSort) res.status(200).json(genreSort)
        else res.status(400).json({ error: "Unable to Fetch Songs" })
    } catch (error) {
        res.status(400).json({ error: "Unable to Fetch Songs" })
    }

    next()
}

const querySongLibrary = async (songs) => {

    let allSongs = []
    let genre = []
    let genreSort = []
    let total_dur;

    songs.map((song) => {

        allSongs.push({
            _id: song._id,
            title: song.title,
            artist: song.artist,
            artists: song.artists,
            album: song.album,
            year: song.year,
            genre: song.genre,
            image: song.image,
            duration: song.duration,
            likes: song.likes,
            song_id: song.song_id,
        })

        song.genre.map((gen) => {
            if (!genre.includes(gen)) {
                genre.push(gen)
            }
        })
    })

    genre.map(async (gen) => {
        let songArr = [];
        total_dur = 0
        songs.map((song) => {
            song.genre.map((songGen) => {
                if (songGen === gen) {
                    songArr.push({
                        _id: song._id,
                        title: song.title,
                        artist: song.artist,
                        artists: song.artists,
                        album: song.album,
                        year: song.year,
                        genre: song.genre,
                        image: song.image,
                        duration: song.duration,
                        likes: song.likes,
                        song_id: song.song_id,
                    })
                    total_dur = total_dur + song.duration
                }
            })
        })
        genreSort.push({
            genre: gen,
            songs: songArr,
            duration: total_dur
        })
    })

    return { allSongs, genre, genreSort }

}