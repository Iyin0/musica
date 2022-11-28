import { useParams } from "react-router-dom";
import PageTransition from "./pageTransition";
import { playPlaylist, togglePlayback } from "./store/player";
import './scss/playlist.scss';
import convert from "./convert";
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useAuthContext } from './hooks/useAuthContext';

const CollectionsPlaylist = () => {

    const playlistID = useParams();
    const [playlist, setPlaylist] = useState(null)
    const [errorPlaylist, setErrorPlaylist] = useState(null)
    const [fetchingPlaylist, setFetchingPlaylist] = useState(null)
    const [likedSong, setLikedSong] = useState([])
    const [duration, setDuration] = useState('')
    const dispatch = useDispatch();
    const { user } = useAuthContext()

    const addSong = (index) => {

        if (!likedSong.includes(index)) {
            const newLikedSongs = [...likedSong, index]
            setLikedSong(newLikedSongs)
        }
    }

    const removeSong = (index) => {
        if (likedSong.includes(index)) {
            const newLikedSongs = likedSong.filter((e) => e !== index)
            setLikedSong(newLikedSongs)
        }
    }

    const getPlaylist = async () => {

        if (!user) {
            setFetchingPlaylist(false)
            setErrorPlaylist('You must be logged in')
            return
        }

        setErrorPlaylist(false)
        setFetchingPlaylist(true)

        const response = await fetch(`/api/playlists/${playlistID.playlist_id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setErrorPlaylist(json)
            setFetchingPlaylist(false)
        }

        if (response.ok) {
            setPlaylist(json)

            const duration = convert(json.duration / 1000)

            const approx_dur = duration.split(':')

            if (approx_dur.length === 1) setDuration(`${approx_dur[0]} sec`)
            else if (approx_dur.length === 2) setDuration(`${approx_dur[0]} mins`)
            else if (approx_dur.length === 3) setDuration(`${approx_dur[0]} hrs`)

            setFetchingPlaylist(false)
        }
    }

    useEffect(() => {
        getPlaylist()
        // eslint-disable-next-line 
    }, [])

    return (
        <PageTransition>
            {fetchingPlaylist &&
                <div className="fetching-playlist playlist">
                    <p>Fetching Playlist</p>
                </div>
            }
            {errorPlaylist &&
                <div className="error-playlist playlist">
                    <p>{errorPlaylist}</p>
                    <button onClick={() => getPlaylist()}>Try again</button>
                </div>
            }
            {playlist &&
                <div
                    className="playlistback"
                    style={{
                        backgroundImage: `url(${playlist.image ? playlist.image : require('./images/defaultImg.png')})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: "no-repeat",
                    }}>
                    <div className="playlist">
                        <header className="playlist_header">
                            <img src={playlist.image ? playlist.image : require('./images/defaultImg.png')} alt="" />
                            <div className="playlist_info">
                                <h1>{playlist.name}</h1>
                                <p>{playlist.description}</p>
                                <p>{playlist.songs.length} songs ~ {duration}</p>
                                <div className="playlist_actions">
                                    <button onClick={() => { dispatch(playPlaylist(playlist.songs)); dispatch(togglePlayback(true)) }}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.00001 1.33331C11.6744 1.33331 14.6667 4.32415 14.6667 8.00384C14.6667 11.6758 11.6744 14.6666 8.00001 14.6666C4.32562 14.6666 1.33334 11.6758 1.33334 8.00384C1.33334 4.32415 4.32562 1.33331 8.00001 1.33331ZM7.24068 5.35325C7.09911 5.35325 6.96397 5.38541 6.83527 5.44973C6.6744 5.53978 6.5457 5.68128 6.47491 5.84851C6.42987 5.96428 6.35908 6.3116 6.35908 6.31804C6.2883 6.69752 6.24969 7.31498 6.24969 7.99676C6.24969 8.64703 6.2883 9.23812 6.34621 9.62403C6.35265 9.63047 6.42343 10.0614 6.50065 10.2093C6.64222 10.4795 6.91893 10.6467 7.21494 10.6467H7.24068C7.43373 10.6403 7.83913 10.473 7.83913 10.4666C8.52125 10.1836 9.86616 9.30244 10.4067 8.71714L10.4453 8.67854C10.5161 8.60779 10.6062 8.49845 10.6255 8.47272C10.7285 8.33765 10.7799 8.17042 10.7799 8.00384C10.7799 7.81667 10.722 7.64301 10.6126 7.50151C10.5869 7.47578 10.4904 7.36644 10.4003 7.27639C9.8726 6.71038 8.4955 5.78419 7.77478 5.50119C7.66539 5.45681 7.38868 5.35968 7.24068 5.35325Z" fill="#FACD66" />
                                        </svg>
                                        <p>Play all</p>
                                    </button>
                                    <button>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.51987 1.66697C5.93987 1.67975 6.34654 1.75308 6.74054 1.88708H6.77987C6.80654 1.89975 6.82654 1.91375 6.83987 1.92641C6.9872 1.97375 7.12654 2.02708 7.25987 2.10041L7.5132 2.21375C7.6132 2.26708 7.7332 2.36641 7.79987 2.40708C7.86654 2.44641 7.93987 2.48708 7.99987 2.53308C8.74054 1.96708 9.63987 1.66041 10.5665 1.66697C10.9872 1.66697 11.4072 1.72641 11.8065 1.86041C14.2672 2.66041 15.1539 5.36041 14.4132 7.72041C13.9932 8.92641 13.3065 10.0271 12.4072 10.9264C11.1199 12.1731 9.7072 13.2797 8.18654 14.2331L8.01987 14.3337L7.84654 14.2264C6.32054 13.2797 4.89987 12.1731 3.60054 10.9197C2.7072 10.0204 2.01987 8.92641 1.5932 7.72041C0.839869 5.36041 1.72654 2.66041 4.21387 1.84641C4.4072 1.77975 4.60654 1.73308 4.80654 1.70708H4.88654C5.07387 1.67975 5.25987 1.66697 5.44654 1.66697H5.51987ZM11.4599 3.77375C11.1865 3.67975 10.8865 3.82708 10.7865 4.10708C10.6932 4.38708 10.8399 4.69375 11.1199 4.79308C11.5472 4.95308 11.8332 5.37375 11.8332 5.83975V5.86041C11.8205 6.01308 11.8665 6.16041 11.9599 6.27375C12.0532 6.38708 12.1932 6.45308 12.3399 6.46708C12.6132 6.45975 12.8465 6.24041 12.8665 5.95975V5.88041C12.8865 4.94641 12.3205 4.10041 11.4599 3.77375Z" fill="#E5524A" />
                                        </svg>
                                        <p>Like</p>
                                    </button>
                                </div>
                            </div>
                        </header>
                        <main className="playlist-songs">
                            {playlist.songs.map((song, index) => (
                                <div className="playlist-song" key={index}>
                                    <div className="playlist-song-avartar">
                                        <img src={song.image.src ? song.image.src : require('./images/defaultImg.png')} alt="" />
                                        <button onClick={() => { addSong(index); removeSong(index) }}>
                                            <svg className={likedSong.includes(index) ? 'songLiked' : ''} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.43496 10.3718C1.54079 7.58016 2.58662 4.10933 5.51746 3.16599C7.05912 2.66849 8.96162 3.08349 10.0425 4.57433C11.0616 3.02849 13.0191 2.67183 14.5591 3.16599C17.4891 4.10933 18.5408 7.58016 17.6475 10.3718C16.2558 14.7968 11.4 17.1018 10.0425 17.1018C8.68579 17.1018 3.87329 14.8485 2.43496 10.3718Z" stroke="#EFEEE0" strokeWidth="0.625" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M13.1572 6.30328C14.163 6.40662 14.7922 7.20412 14.7547 8.32162" stroke="#EFEEE0" strokeWidth="0.625" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="playlist-song-owner">{song.title} ~ {song.artist}</p>
                                    {/* <p>{song.type}</p> */}
                                    <p>Single</p>
                                    <p>{convert(song.duration / 1000)}</p>
                                    <button>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.25782 8.94595C8.63788 8.94595 8.94598 8.63785 8.94598 8.25779C8.94598 7.87774 8.63788 7.56964 8.25782 7.56964C7.87777 7.56964 7.56967 7.87774 7.56967 8.25779C7.56967 8.63785 7.87777 8.94595 8.25782 8.94595Z" stroke="#FACD66" strokeWidth="1.3763" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.25782 4.12887C8.63788 4.12887 8.94598 3.82077 8.94598 3.44072C8.94598 3.06066 8.63788 2.75256 8.25782 2.75256C7.87777 2.75256 7.56967 3.06066 7.56967 3.44072C7.56967 3.82077 7.87777 4.12887 8.25782 4.12887Z" stroke="#FACD66" strokeWidth="1.3763" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.25782 13.763C8.63788 13.763 8.94598 13.4549 8.94598 13.0749C8.94598 12.6948 8.63788 12.3867 8.25782 12.3867C7.87777 12.3867 7.56967 12.6948 7.56967 13.0749C7.56967 13.4549 7.87777 13.763 8.25782 13.763Z" stroke="#FACD66" strokeWidth="1.3763" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </main>
                    </div>
                </div>
            }
        </PageTransition>
    );
}

export default CollectionsPlaylist;