const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const bodyParser = require("body-parser");
const accountRoutes = require("./router/accountRoutes")
const playlistRoutes = require("./router/playlistRoutes")


const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors({
        origin: "*",
        credentials: true
    })
)

app.use('/api/accounts', accountRoutes)
app.use('/api/playlists', playlistRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server live on ${PORT}`)
        });
    })
    .catch((error) => console.log(error))