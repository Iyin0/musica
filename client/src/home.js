import './scss/home.scss';
import { motion } from 'framer-motion';
import PageTransition from './pageTransition';
import convert from './convert';
import topCharts from './topCharts';
import playlist1 from './playlist1';
import { Link } from 'react-router-dom';
import { useState } from 'react'

const Home = () => {

    const rbLikes = 33000

    const [likedSong, setLikedSong] = useState([])

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


    const shortenLikes = (likes) => {       // to shorten the likes

        const str = likes.toString()

        if (str.length < 3) {
            return likes
        }

        else if (str.length > 3) {
            return str.slice(0, 2) + 'k'
        }

    }


    return (
        <PageTransition>
            <motion.div className="home">
                <div className="home-section1">
                    <div className="rbHits">
                        <div className="rbHits-info">
                            <p className="curated">Currated playlist</p>
                            <div>
                                <h2 className='rbName'>R & B Hits</h2>
                                <p className='rbDesc'>All mine, Lie again, Petty call me everyday, Out of time, No love, Bad Habit, and so much more</p>
                            </div>
                            <div className='rbLikedSection'>
                                <div className="rbLikedPics">
                                    <img src={require('./images/Ellipse 2.png')} alt="" />
                                    <img src={require('./images/Ellipse 3.png')} alt="" />
                                    <img src={require('./images/Ellipse 4.png')} alt="" />
                                    <img src={require('./images/Ellipse 5.png')} alt="" />
                                    <img src={require('./images/Ellipse 6.png')} alt="" />
                                </div>
                                <p className="rbLikes">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.51981 1.66697C5.93981 1.67975 6.34647 1.75308 6.74047 1.88708H6.77981C6.80647 1.89975 6.82647 1.91375 6.83981 1.92641C6.98714 1.97375 7.12647 2.02708 7.25981 2.10041L7.51314 2.21375C7.61314 2.26708 7.73314 2.36641 7.79981 2.40708C7.86647 2.44641 7.93981 2.48708 7.99981 2.53308C8.74047 1.96708 9.63981 1.66041 10.5665 1.66697C10.9871 1.66697 11.4071 1.72641 11.8065 1.86041C14.2671 2.66041 15.1538 5.36041 14.4131 7.72041C13.9931 8.92641 13.3065 10.0271 12.4071 10.9264C11.1198 12.1731 9.70714 13.2797 8.18647 14.2331L8.01981 14.3337L7.84647 14.2264C6.32047 13.2797 4.89981 12.1731 3.60047 10.9197C2.70714 10.0204 2.01981 8.92641 1.59314 7.72041C0.839808 5.36041 1.72647 2.66041 4.21381 1.84641C4.40714 1.77975 4.60647 1.73308 4.80647 1.70708H4.88647C5.07381 1.67975 5.25981 1.66697 5.44647 1.66697H5.51981ZM11.4598 3.77375C11.1865 3.67975 10.8865 3.82708 10.7865 4.10708C10.6931 4.38708 10.8398 4.69375 11.1198 4.79308C11.5471 4.95308 11.8331 5.37375 11.8331 5.83975V5.86041C11.8205 6.01308 11.8665 6.16041 11.9598 6.27375C12.0531 6.38708 12.1931 6.45308 12.3398 6.46708C12.6131 6.45975 12.8465 6.24041 12.8665 5.95975V5.88041C12.8865 4.94641 12.3205 4.10041 11.4598 3.77375Z" fill="white" />
                                    </svg>
                                    {shortenLikes(rbLikes)} Likes
                                </p>
                            </div>
                        </div>
                        <img src={require("./images/Pexels Photo by Eric Esma.png")} alt="" className="rbHits-img" />
                    </div>
                    <div className="topCharts">
                        <h2>Top charts</h2>
                        <div className="topchart-playlists">
                            {topCharts.map((track, index) => (
                                <div className="topChart" key={index}>
                                    <img src={track.image} alt="" />
                                    <div className="topChartInfo">
                                        <Link to={`/home/playlist/${track.id}&${track.name}`} className="topChartName">{track.name}</Link>
                                        <p className="topChartOwn">{track.owner}</p>
                                        <p className="topChartDur">{convert(track.duration / 1000)}</p>
                                    </div>
                                    <button className="topChartLike" onClick={() => { addSong(index); removeSong(index) }}>
                                        <svg className={likedSong.includes(index) ? 'songLiked' : ''} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.15388 8.69874C1.34913 6.18624 2.28963 3.31449 4.92738 2.46474C6.31488 2.01699 7.84638 2.28099 8.99988 3.14874C10.0911 2.30499 11.6789 2.01999 13.0649 2.46474C15.7026 3.31449 16.6491 6.18624 15.8451 8.69874C14.5926 12.6812 8.99988 15.7487 8.99988 15.7487C8.99988 15.7487 3.44838 12.7277 2.15388 8.69874Z" stroke="#FACD66" strokeWidth="0.5625" strokeLinecap="round" strokeLinejoin="round" />
                                            <path opacity="0.4" d="M12 5.02501C12.8025 5.28451 13.3695 6.00076 13.4377 6.84151" stroke="#FACD66" strokeWidth="0.5625" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="latest">
                    <h2>New releases</h2>
                    <div className='topLatest'>
                        {playlist1.map((track, index) => (
                            <div className="newTrack" key={index}>
                                <img src={track.image} alt="" />
                                <p>{track.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="latest">
                    <h2>New in your area</h2>
                    <div className='topLatest'>
                        {playlist1.map((track, index) => (
                            <div className="newTrack" key={index}>
                                <img src={track.image} alt="" />
                                <p>{track.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="latest">
                    <h2>Hot Hot</h2>
                    <div className='topLatest'>
                        {playlist1.map((track, index) => (
                            <div className="newTrack" key={index}>
                                <img src={track.image} alt="" />
                                <p>{track.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </PageTransition>
    );
}

export default Home;