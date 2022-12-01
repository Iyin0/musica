import { configureStore } from '@reduxjs/toolkit'
import sideNavbarState from './sideNav'
import player from './player'
import playlistData from './playlistData'

export default configureStore({
    reducer: {
        sideNavState: sideNavbarState,
        playerState: player,
        displayPlaylistData: playlistData
    }
})