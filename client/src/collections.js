import './scss/collections.scss';
import { motion } from "framer-motion";
import PageTransition from './pageTransition';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPlaylist } from "./store/player";
import { updatePlaylist } from './store/playlists';
import { Link } from 'react-router-dom';


const Collections = () => {

    const jsmediatags = window.jsmediatags;
    const [likePage, setLikePage] = useState(false)
    const [playlistPageState, setPlaylistPageState] = useState(false)
    const allPlaylists = useSelector((state) => state.readPlaylist.playlists)
    const dispatch = useDispatch();
    const [playlists, setPlaylists] = useState([])
    const [playlistName, setPlaylistName] = useState()
    const [playlistDesc, setPlaylistDesc] = useState()
    const [playlistImage, setPlaylistImage] = useState(require('./images/defaultImg.png'))

    const addSong = (e) => {

        e.preventDefault()

        let newSongs = []

        let input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = () => {
            Array.from(input.files).forEach((song) => {
                if (song.type.includes('audio')) {
                    let audio = document.createElement('audio')

                    audio.src = URL.createObjectURL(song)

                    audio.onloadedmetadata = async () => {
                        let audio_duration = audio.duration * 1000  // to milliseconds

                        jsmediatags.read(song, {
                            onSuccess: function async(tags) {
                                let imgSrc = require('./images/defaultImg.png')
                                let genreSrc = ''
                                if (tags.tags.picture !== undefined) {
                                    const data = tags.tags.picture.data
                                    const format = tags.tags.picture.format
                                    let base64String = ""

                                    for (let i = 0; i < data.length; i++)
                                        base64String += String.fromCharCode(data[i])
                                    imgSrc = `data:${format};base64,${window.btoa(base64String)}`
                                }

                                if (tags.tags.genre !== undefined) {
                                    genreSrc = tags.tags.genre
                                }

                                newSongs.push({
                                    title: tags.tags.title,
                                    artist: tags.tags.artist,
                                    album: tags.tags.album,
                                    genre: genreSrc,
                                    image: imgSrc,
                                    src: URL.createObjectURL(song),
                                    size: song.size,
                                    duration: audio_duration
                                })
                                setPlaylists(playlists.concat(newSongs))
                                // console.log(newSongs)
                            },
                            onError: function (error) {
                                // console.log(error);

                            }
                        })
                        // const tags = await id3.fromFile(song)
                        //     newSongs.push({
                        //         title: tags.title,
                        //         artist: tags.artist,
                        //         album: tags.album,
                        //         genre: tags.genre,
                        //         image: `data:${format};base64,${window.btoa(base64String)}`,
                        //         // image: tags.images,
                        //         // image: 'data:image/jpg;base64,' + btoa(arrayString),
                        //         year: tags.year,
                        //         src: URL.createObjectURL(song)
                        //     })
                        // setPlaylists(allPlaylists.concat(newSongs))
                    }
                }

            })
        };
        input.click();
    }

    const addImage = (e) => {
        e.preventDefault()

        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _this => {
            if (Array.from(input.files)[0].size > 10000000) {
                alert("file too large")
            }
            else {
                // to get the file from local storage
                let file = Array.from(input.files)[0];
                setPlaylistImage(URL.createObjectURL(file))
            }
        };
        input.click();
    }

    const clearField = () => {
        setPlaylistImage('')
        setPlaylistDesc('')
        setPlaylistName('')
        setPlaylists([])
    }

    const addPlaylist = (e) => {
        e.preventDefault()

        let totalDur = 0

        playlists.forEach((duration) => {
            totalDur = totalDur + duration.duration
        })

        if (playlistName === '') {
            alert('Playlist name cannot be empty')
        }
        else if (playlists.length < 1) {
            alert('No Song Added')
        }
        else {
            const playlist = {
                id: allPlaylists.length + 1,
                name: playlistName,
                description: playlistDesc,
                image: playlistImage,
                playlists: playlists,
                duration: totalDur
            }

            dispatch(updatePlaylist([...allPlaylists, playlist]))
            clearField()
            setPlaylistPageState(false)
        }

    }

    useEffect(() => {
        console.log(allPlaylists)
    }, [allPlaylists])

    return (
        <PageTransition>
            <motion.div className="collections">
                <header>
                    <button className={likePage ? '' : 'selected-page'} onClick={() => setLikePage(false)}>My collection</button>
                    <button className={likePage ? 'selected-page' : ''} onClick={() => setLikePage(true)}>Likes</button>
                </header>

                {likePage ? (
                    <main className="likes-page">

                    </main>
                ) : (
                    <main className='collection-page'>
                        <div className="user-collections">
                            {allPlaylists.map((playlist, index) => (
                                <div className="playlists" key={index}>
                                    <div className='playlist-header'>
                                        <h2>{playlist.name}</h2>
                                        <Link to={`/collections/playlist/${playlist.id}&${playlist.name}`} className="topChartName">See more</Link>
                                    </div>
                                    <div className='playlist-container'>
                                        {playlist.playlists.slice(0, 10).map((song, index) => (
                                            <div className='playlist-items' key={index} >
                                                <img src={song.image} alt="" />
                                                <p className="collection-name">{song.title}</p>
                                                <p className="collection-artist">{song.artist}</p>
                                                <button onClick={() => {
                                                    let empty = []
                                                    dispatch(playPlaylist([...empty, song]))
                                                }}>
                                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M40 20.0096C40 31.0275 31.0232 40 20 40C8.97683 40 0 31.0275 0 20.0096C0 8.9725 8.97683 0 20 0C31.0232 0 40 8.9725 40 20.0096Z" fill="#FACD66" />
                                                        <path d="M28 20.0097C28 20.5152 27.8409 21.0226 27.5227 21.4289C27.4631 21.5086 27.1847 21.8372 26.9659 22.051L26.8466 22.1677C25.1761 23.9388 21.0199 26.6022 18.9119 27.4557C18.9119 27.4751 17.6591 27.9825 17.0625 28H16.983C16.0682 28 15.2131 27.4965 14.7756 26.68C14.5369 26.2309 14.3182 24.9283 14.2983 24.9108C14.1193 23.7424 14 21.9538 14 19.9903C14 17.9315 14.1193 16.0632 14.3381 14.9162C14.3381 14.8967 14.5568 13.8469 14.696 13.497C14.9148 12.9934 15.3125 12.5638 15.8097 12.2916C16.2074 12.0991 16.625 12 17.0625 12C17.5199 12.0214 18.375 12.3111 18.7131 12.4471C20.9403 13.3026 25.196 16.1021 26.8267 17.8129C27.1051 18.0851 27.4034 18.4175 27.483 18.4933C27.821 18.921 28 19.4459 28 20.0097Z" fill="#FACD66" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className='add-playlist-btn' onClick={() => setPlaylistPageState(true)}>Create New Playlist</button>

                        {playlistPageState &&

                            <div className='playlist-form-back'>
                                <div className="playlist-form-container">
                                    <div className='close-add-playlist'>
                                        <h2>Create New Playlist</h2>
                                        <button onClick={() => { clearField(); setPlaylistPageState(false) }}>Close</button>
                                    </div>
                                    <form action="">
                                        <label htmlFor="">Name</label><br />
                                        <input type="text" onInput={(e) => setPlaylistName(e.target.value)} /><br />
                                        <label htmlFor="">Description</label><br />
                                        <textarea name="" id="" onInput={(e) => setPlaylistDesc(e.target.value)}></textarea><br />
                                        <div>
                                            <button className='add-playlist-image' onClick={(e) => addImage(e)}>Add Playlist Image</button><br />
                                            <button className='add-playlist-songs' onClick={(e) => addSong(e)}>Add Songs</button><br />
                                        </div>

                                        <div>
                                            <button className='submit-playlist-data' onClick={(e) => addPlaylist(e)}>Add Playlist</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    </main>
                )}
            </motion.div>
        </PageTransition>
    );
}

export default Collections;