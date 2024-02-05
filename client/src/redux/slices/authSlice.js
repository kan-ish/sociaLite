import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: null,
	posts: [],
	mode: "dark"
};

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setUserLogout: (state) => {
			state.user = null;
			state.token = null;
			deleteAllCookies();
		},
		setFriends: (state, action) => {
			state.user && (state.user.friends = action.payload.friends);
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const updatedPosts = state.posts.map((post) => {
				if (post._id === action.payload.post._id) {
					return action.payload.post;
				}
				return post;
			});

			state.posts = updatedPosts
		},
		toggleThemeMode: (state) => {
			state.mode = state.mode === "dark" ? "light" : "dark"
		},
	},
});

export const { setUserLogin, setUserLogout, setFriends, setPost, setPosts, toggleThemeMode } = authSlice.actions;
export default authSlice.reducer;
