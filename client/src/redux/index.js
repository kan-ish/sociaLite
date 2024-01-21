import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js"

const store = configureStore({
    reducer: authReducer
})
  
export default store