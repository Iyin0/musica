import './scss/topbar.scss'
import { useState } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { setNavbarState } from './store/sideNav';

const TopBar = () => {

    const [searchPage, setSearchPage] = useState(false)
    const sideNavState = useSelector((state) => state.sideNavState.value)
    // const allSongs = useSelector((state) => state.addSongs.songs)
    const toggleSideNavbar = useDispatch()
    const [search, setsearch] = useState()
    const [artists, setArtists] = useState([])
    const [albums, setAlbum] = useState([])
    const [songs, setSongs] = useState([])
    const [genre, setGenre] = useState([])

    // console.log(allSongs)

    // const artists = allSongs.filter((e) => e.artist === search)

    // console.log(artists)

    const searchSongs = () => {

        // setArtists(allSongs.filter((e) => e.artist.includes(search)))
        // setAlbum(allSongs.filter((e) => e.album.includes(search)))
        // setSongs(allSongs.filter((e) => e.title.includes(search)))
        // setGenre(allSongs.filter((e) => e.genre.includes(search)))

    }

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
                    onBlur={() => { setSearchPage(false); setAlbum([]); setArtists([]); setSongs([]); setGenre([]) }}
                    onChange={(e) => { setsearch(e.target.value); searchSongs() }}

                />
            </div>
            {searchPage &&
                <motion.div className="search-page" >
                    <h2>{search}</h2>

                    {artists &&
                        <div className="user-collections">
                            {artists.map((collection, index) => (
                                <div className="my-collection" key={index}>
                                    <img src={collection.image} alt="" />
                                    <p className="collection-name">{collection.title}</p>
                                    <p className="collection-artist">{collection.artist}</p>
                                </div>
                            ))}
                        </div>
                    }

                    {albums &&
                        <div className="user-collections">
                            {albums.map((collection, index) => (
                                <div className="my-collection" key={index}>
                                    <img src={collection.image} alt="" />
                                    <p className="collection-name">{collection.title}</p>
                                    <p className="collection-artist">{collection.artist}</p>
                                </div>
                            ))}
                        </div>
                    }

                    {songs &&
                        <div className="user-collections">
                            {songs.map((collection, index) => (
                                <div className="my-collection" key={index}>
                                    <img src={collection.image} alt="" />
                                    <p className="collection-name">{collection.title}</p>
                                    <p className="collection-artist">{collection.artist}</p>
                                </div>
                            ))}
                        </div>
                    }

                    {genre &&
                        <div className="user-collections">
                            {genre.map((collection, index) => (
                                <div className="my-collection" key={index}>
                                    <img src={collection.image} alt="" />
                                    <p className="collection-name">{collection.title}</p>
                                    <p className="collection-artist">{collection.artist}</p>
                                </div>
                            ))}
                        </div>
                    }
                </motion.div>
            }
        </nav>
    );
}

export default TopBar;