import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";

import Home from "./Pages/Home";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
};

export default App;