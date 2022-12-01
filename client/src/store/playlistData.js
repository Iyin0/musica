import { createSlice } from '@reduxjs/toolkit'

export const homeData = createSlice({
    name: 'songs',
    initialState: {
        data: null,
        topChart: null,
        collectionPlaylists: null,
        user: null
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },

        setTopChart: (state, action) => {
            state.topChart = action.payload
        },

        setColPlay: (state, action) => {
            state.collectionPlaylists = action.payload
        },

        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setData, setTopChart, setColPlay, setUser } = homeData.actions

export default homeData.reducer