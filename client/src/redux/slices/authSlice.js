import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setUserLogout: (state) => {
            state.user = null
            state.token = null
        }
    }
})

export const { setUserLogin, setUserLogout } = authSlice.actions
export default authSlice.reducer