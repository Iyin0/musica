const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const bodyParser = require("body-parser");
const accountRoutes = require("./router/accountRoutes")
const playlistRoutes = require("./router/playlistRoutes")
const songRoutes = require("./router/songRoutes")
const userRoutes = require("./router/userRoutes")
const Grid = require('gridfs-stream');


const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors({
        origin: ["https://localhost:3000", "https://musica-by-iyin.netlify.app"],
        credentials: true
    })
)
app.use('/public', express.static('public'))
app.use('/api/auth', accountRoutes)
app.use('/api/user', userRoutes)
app.use('/api/playlists', playlistRoutes)
app.use('/api/song', songRoutes)

// initialize gfs
let gfs;

mongoose.connect(process.env.MONGO_URI)
    .then((db) => {
        gfs = Grid(db, mongoose.mongo)
        app.listen(PORT, () => {
            console.log(`Server live on ${PORT}`)
        });
    })
    .catch((error) => console.log(error))