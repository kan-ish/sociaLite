import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'

const persistConfig = { key: "root", storage: new CookieStorage(Cookies), version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export default store;
