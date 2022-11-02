import './scss/topbar.scss'
import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { setNavbarState } from './store/sideNav';
import { playPlaylist, togglePlayback } from "./store/player";

const TopBar = () => {

    const [searchPage, setSearchPage] = useState(false)
    const sideNavState = useSelector((state) => state.sideNavState.value)
    const allPlaylists = useSelector((state) => state.readPlaylist.playlists)
    const toggleSideNavbar = useDispatch()
    const [search, setsearch] = useState('')
    const [songs, setSongs] = useState([])
    const [library, setLibrary] = useState([])
    const dispatch = useDispatch();

    const searchSongs = () => {
        const songs = library.filter((e) => e.title.includes(search) || e.artist.includes(search) || e.album.includes(search) || e.genre.includes(search))
        setSongs(songs)
    }


    useEffect(() => {
        if (search === '') setSongs(library)
    }, [search, library])

    useEffect(() => {
        let updateLib = []
        allPlaylists.forEach((playlist) => {
            playlist.playlists.forEach((songs) => {
                updateLib.push(songs)
            })
        })
        setLibrary(updateLib)
    }, [allPlaylists])

    return (
        <nav>
            <div className='hamburger-container'>
                <button onClick={() => toggleSideNavbar(setNavbarState(!sideNavState))}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_107_495)">
                            <path d="M4 8H20" stroke="#EFEEE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 16H20" stroke="#EFEEE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_107_495">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <img src={require('./images/logo.png')} alt="" />
            </div>
            <div className="searchbar">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="white" strokeOpacity="0.25" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 14L11.1 11.1" stroke="white" strokeOpacity="0.25" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input type="search"
                    id="asearch"
                    name="asearch"
                    placeholder="Search artists"
                    onFocus={() => setSearchPage(true)}
                    onChange={(e) => { setsearch(e.target.value); searchSongs() }}

                />
            </div>
            {searchPage &&
                <motion.div className="search-page" >
                    <div className='search-header'>
                        <h2>{search}</h2>
                        <button onClick={() => { setSearchPage(false); setSongs([]) }}>Close</button>
                    </div>
                    {songs ? (
                        <div className="search-container">
                            {songs.map((song, index) => (
                                <div className="playlist-items" key={index}>
                                    <img src={song.image} alt="" />
                                    <p className="collection-name">{song.title}</p>
                                    <p className="collection-artist">{song.artist}</p>
                                    <button onClick={() => {
                                        let empty = []
                                        dispatch(playPlaylist([...empty, song]));
                                        dispatch(togglePlayback(true))
                                    }}>
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M40 20.0096C40 31.0275 31.0232 40 20 40C8.97683 40 0 31.0275 0 20.0096C0 8.9725 8.97683 0 20 0C31.0232 0 40 8.9725 40 20.0096Z" fill="#FACD66" />
                                            <path d="M28 20.0097C28 20.5152 27.8409 21.0226 27.5227 21.4289C27.4631 21.5086 27.1847 21.8372 26.9659 22.051L26.8466 22.1677C25.1761 23.9388 21.0199 26.6022 18.9119 27.4557C18.9119 27.4751 17.6591 27.9825 17.0625 28H16.983C16.0682 28 15.2131 27.4965 14.7756 26.68C14.5369 26.2309 14.3182 24.9283 14.2983 24.9108C14.1193 23.7424 14 21.9538 14 19.9903C14 17.9315 14.1193 16.0632 14.3381 14.9162C14.3381 14.8967 14.5568 13.8469 14.696 13.497C14.9148 12.9934 15.3125 12.5638 15.8097 12.2916C16.2074 12.0991 16.625 12 17.0625 12C17.5199 12.0214 18.375 12.3111 18.7131 12.4471C20.9403 13.3026 25.196 16.1021 26.8267 17.8129C27.1051 18.0851 27.4034 18.4175 27.483 18.4933C27.821 18.921 28 19.4459 28 20.0097Z" fill="#FACD66" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (null)

                    }
                </motion.div>
            }
        </nav>
    );
}

export default TopBar;