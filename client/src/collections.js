import './scss/collections.scss';
import { motion } from "framer-motion";
import PageTransition from './pageTransition';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPlaylist, togglePlayback } from "./store/player";
import { Link } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Loading from './loading';
import { setColPlay } from './store/playlistData';


const Collections = () => {

    const [likePage, setLikePage] = useState(false)
    const [playlistPageState, setPlaylistPageState] = useState(null)
    const [errorUploadingPlaylist, setErrorUploadingPlaylist] = useState(null)
    const [uploadingPlaylist, setUploadingPlaylist] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(null)
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.displayPlaylistData.collectionPlaylists)
    const [errorFetchingPlaylist, setErrorFetchingPlaylist] = useState(null)
    const [fetchingPlaylist, setFetchingPlaylist] = useState(null)
    const [playlistName, setPlaylistName] = useState('')
    const [playlistDesc, setPlaylistDesc] = useState('')
    const [playlistImage, setPlaylistImage] = useState()
    const [playlistSongs, setPlaylistSongs] = useState([])
    const { user } = useAuthContext()

    const addSong = (e) => {

        e.preventDefault()

        let newSongs = playlistSongs

        let input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = () => {
            Array.from(input.files).forEach((song) => {
                if (song.type.includes('audio')) {     // to only accept audio files
                    newSongs.push(song)
                }
            })
            setPlaylistSongs(newSongs)
        };
        input.click();
    }

    const addImage = (e) => {
        e.preventDefault()

        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _this => {
            const img = []
            if (input.files[0].type.includes('image')) {
                if (Array.from(input.files)[0].size > 10000000) {
                    alert("file too large")
                }
                else {
                    Array.from(input.files).forEach((image) => {
                        img.push(image)
                    })
                }
                setPlaylistImage(img)
            }
            else alert('Must only upload image files')

        };
        input.click();
    }

    const clearField = () => {
        setPlaylistImage('')
        setPlaylistDesc('')
        setPlaylistName('')
        setPlaylistSongs([])
    }

    const addPlaylist = async (e) => {

        e.preventDefault()

        setPlaylistPageState(false)

        if (!user) {
            return
        }

        setErrorUploadingPlaylist(null)
        setUploadingPlaylist(true)

        const formData = new FormData();

        formData.append("name", playlistName)
        formData.append("description", playlistDesc)

        if (playlistImage) {
            playlistImage.forEach((img) => {
                formData.append("image", img)
            })

        }

        playlistSongs.forEach((song) => {
            formData.append("songs", song)
        })

        const response = await fetch('https://musica-by-iyin-api.onrender.com/api/playlists', {
            method: 'POST',
            headers: {
                // eslint-disable-next-line
                'Authorization': `Bearer ${user.token}`,
                // 'Content-Type': `multipart/form-data; boundary="${playlistName}"`
            },
            body: formData
        })

        const json = await response.json()

        if (!response.ok) {
            setUploadingPlaylist(false)
            setErrorUploadingPlaylist(json.error)
        }

        if (response.ok) {
            setUploadingPlaylist(false)
            setUploadSuccess('Playlist Created!!!')
        }
    }

    const getAllPlaylist = async () => {

        if (!user) {
            setFetchingPlaylist(false)
            dispatch(setColPlay(null))
            setErrorFetchingPlaylist('You must be logged in')
            return
        }

        if (!playlists) {
            setErrorFetchingPlaylist(null)
            setFetchingPlaylist(true)

        }
        try {
            const response = await fetch('https://musica-by-iyin-api.onrender.com/api/playlists', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            })

            const json = await response.json()

            if (!response.ok) {
                setErrorFetchingPlaylist(json.error)
                setFetchingPlaylist(null)
            }

            if (response.ok) {
                dispatch(setColPlay(json))
                setFetchingPlaylist(null)
                setErrorFetchingPlaylist(null)
            }
        } catch (error) {
            if (error.message === "Failed to fetch") {
                alert("No Internet Connection")
            }
            setFetchingPlaylist(false)
        }
    }

    useEffect(() => {
        getAllPlaylist()
        // eslint-disable-next-line
    }, [])

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
                        {playlists &&
                            <motion.div className="user-collections">
                                {playlists.map((playlist, index) => (
                                    <div className="playlists" key={index}>
                                        <div className='playlist-header'>
                                            <h2>{playlist.name}</h2>
                                            <Link to={`/collections/playlist/${playlist._id}`} className="topChartName">See more</Link>
                                        </div>
                                        <div className='playlist-container'>
                                            {playlist.songs.slice(0, 10).map((song, index) => (
                                                <div className='playlist-items' key={index} >
                                                    <img src={song.image.src ? song.image.src : require('./images/defaultImg.png')} alt="" />
                                                    <p className="collection-name">{song.title}</p>
                                                    <p className="collection-artist">{song.artist}</p>
                                                    <motion.button
                                                        initial={{ opacity: 0 }}
                                                        animate={{
                                                            x: 5,
                                                            opacity: 1,
                                                        }}
                                                        exit={{ opacity: 0 }}
                                                        whileHover={{
                                                            scale: 1.2,
                                                            transition: { duration: 1, repeat: Infinity, ease: "easeOut" },
                                                        }}
                                                        transition={{ ease: "easeOut", duration: 1 }}
                                                        onClick={() => {
                                                            let empty = []
                                                            dispatch(playPlaylist([...empty, song]));
                                                            dispatch(togglePlayback(true))
                                                        }}>
                                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M40 20.0096C40 31.0275 31.0232 40 20 40C8.97683 40 0 31.0275 0 20.0096C0 8.9725 8.97683 0 20 0C31.0232 0 40 8.9725 40 20.0096Z" fill="#FACD66" />
                                                            <path d="M28 20.0097C28 20.5152 27.8409 21.0226 27.5227 21.4289C27.4631 21.5086 27.1847 21.8372 26.9659 22.051L26.8466 22.1677C25.1761 23.9388 21.0199 26.6022 18.9119 27.4557C18.9119 27.4751 17.6591 27.9825 17.0625 28H16.983C16.0682 28 15.2131 27.4965 14.7756 26.68C14.5369 26.2309 14.3182 24.9283 14.2983 24.9108C14.1193 23.7424 14 21.9538 14 19.9903C14 17.9315 14.1193 16.0632 14.3381 14.9162C14.3381 14.8967 14.5568 13.8469 14.696 13.497C14.9148 12.9934 15.3125 12.5638 15.8097 12.2916C16.2074 12.0991 16.625 12 17.0625 12C17.5199 12.0214 18.375 12.3111 18.7131 12.4471C20.9403 13.3026 25.196 16.1021 26.8267 17.8129C27.1051 18.0851 27.4034 18.4175 27.483 18.4933C27.821 18.921 28 19.4459 28 20.0097Z" fill="#FACD66" />
                                                        </svg>
                                                    </motion.button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        }
                        {fetchingPlaylist &&
                            <motion.div className="fetching-error">
                                <Loading />
                            </motion.div>
                        }
                        {errorFetchingPlaylist &&
                            <motion.div className="fetching-error">
                                <p>{errorFetchingPlaylist}</p>
                                <button onClick={() => getAllPlaylist()}>Try again</button>
                            </motion.div>
                        }

                        {user && (
                            <button className='add-playlist-btn' onClick={() => setPlaylistPageState(true)}>Create New Playlist</button>
                        )}

                        {playlistPageState &&

                            <motion.div className='playlist-form-back'>
                                <div className="playlist-form-container">
                                    <div className='close-add-playlist'>
                                        <h2>Create New Playlist</h2>
                                        <button onClick={() => { clearField(); setPlaylistPageState(false) }}>Close</button>
                                    </div>
                                    <form action="" onSubmit={addPlaylist}>
                                        <label htmlFor="">Name</label><br />
                                        <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} /><br />
                                        <label htmlFor="">Description</label><br />
                                        <textarea name="" id="" value={playlistDesc} onChange={(e) => setPlaylistDesc(e.target.value)}></textarea><br />
                                        <div>
                                            <button className='add-playlist-image' onClick={(e) => addImage(e)}>Add Playlist Image</button><br />
                                            <button className='add-playlist-songs' onClick={(e) => addSong(e)}>Add Songs</button><br />
                                        </div>

                                        <div>
                                            <button className='submit-playlist-data'>Add Playlist</button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        }

                        {uploadingPlaylist && (
                            <motion.div className="playlist-form-back">
                                <div className="playlist-form-container">
                                    <div className="playlist-upload">
                                        <p>Uplaoding Playlist...</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {errorUploadingPlaylist && (
                            <motion.div className="playlist-form-back">
                                <div className="playlist-form-container">
                                    <div className="playlist-upload">
                                        <p>{errorUploadingPlaylist}</p>
                                        <div>
                                            <button onClick={() => { setPlaylistPageState(true); setErrorUploadingPlaylist(false) }}>Try Again</button>
                                            <button onClick={() => { clearField(); setErrorUploadingPlaylist(false) }}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {uploadSuccess && (
                            <motion.div className="playlist-form-back">
                                <div className="playlist-form-container">
                                    <div className="playlist-upload">
                                        <p>{uploadSuccess}</p>
                                        <button onClick={() => { getAllPlaylist(); clearField(); setUploadSuccess(false) }}>Okay</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </main>
                )}
            </motion.div>
        </PageTransition>
    );
}

export default Collections;