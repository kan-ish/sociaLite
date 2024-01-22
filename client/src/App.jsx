import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import HomePage from "./views/homePage/HomePage";
import AuthPage from "./views/authPage/AuthPage";
import ProfilePage from "./views/profilePage/ProfilePage";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./utils/theme";

function App() {
	const isCurrentUser = useSelector((state) => state.token);
	const theme = createTheme(themeSettings());

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route
						path="/"
						element={isCurrentUser ? <Navigate to="/home" /> : <AuthPage />}
					/>
					<Route
						path="/home"
						element={isCurrentUser ? <HomePage /> : <Navigate to="/" />}
					/>
					<Route
						path="/profile/:userid"
						element={isCurrentUser ? <ProfilePage /> : <Navigate to="/home" />}
					/>
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
