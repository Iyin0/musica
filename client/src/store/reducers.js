import { configureStore } from '@reduxjs/toolkit'
import sideNavbarState from './sideNav'
import player from './player'
import readPlaylist from './playlists'

export default configureStore({
    reducer: {
        sideNavState: sideNavbarState,
        playerState: player,
        readPlaylist: readPlaylist
    }
})