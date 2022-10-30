import { createSlice } from '@reduxjs/toolkit'

export const sideNavbarState = createSlice({
    name: 'sideNavbar',
    initialState: {
        value: false,
    },
    reducers: {
        setNavbarState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setNavbarState } = sideNavbarState.actions

export default sideNavbarState.reducer