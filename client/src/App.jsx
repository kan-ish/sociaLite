import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./views/homePage/HomePage";
import LoginPage from "./views/loginPage/LoginPage";
import ProfilePage from "./views/profilePage/ProfilePage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/profile/:userid" element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
