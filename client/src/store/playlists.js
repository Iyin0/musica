import { createSlice } from '@reduxjs/toolkit'

export const allPlaylists = createSlice({
    name: 'songs',
    initialState: {
        playlists: []
    },
    reducers: {
        updatePlaylist: (state, action) => {
            state.playlists = action.payload
        }
    }
})

export const { updatePlaylist } = allPlaylists.actions

export default allPlaylists.reducer