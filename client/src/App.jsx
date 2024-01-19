import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./views/homePage/HomePage";
import LoginPage from "./views/loginPage/LoginPage";
import ProfilePage from "./views/profilePage/ProfilePage";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./utils/theme";

function App() {
	const theme = createTheme(themeSettings());

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/profile/:userid" element={<ProfilePage />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
