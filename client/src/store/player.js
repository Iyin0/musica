import { createSlice } from '@reduxjs/toolkit'

export const playableList = createSlice({
    name: 'songs',
    initialState: {
        songs: [],
        playback: false
    },
    reducers: {
        playPlaylist: (state, action) => {
            state.songs = action.payload
        },

        togglePlayback: (state, action) => {
            state.playback = action.payload
        }
    }
})

export const { playPlaylist, togglePlayback } = playableList.actions

export default playableList.reducer