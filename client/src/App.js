import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
};

export default App;
