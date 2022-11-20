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


//  to get a single song
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
