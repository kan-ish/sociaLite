import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Provider } from "react-redux";
import store from "./redux/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistStore(store)}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
