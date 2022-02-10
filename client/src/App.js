import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./styles/App.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import RestrictAuth from "./Routes/RestrictAuth";

import { refreshAccessToken } from "./Actions/authAction";

const App = () => {
	const [loading, setLoading] = useState(false);
	const { expiresIn } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	// refresh AccessToken;
	useEffect(() => {
		setLoading(true);
		dispatch(refreshAccessToken(() => setLoading(false)));
	}, [dispatch]);

	useEffect(() => {
		if (!expiresIn) return;

		let refreshInterval = expiresIn * 1000 - Date.now();

		const interval = setInterval(() => {
			dispatch(refreshAccessToken());
		}, refreshInterval - 60000);

		return () => {
			clearInterval(interval);
		};
	}, [expiresIn, dispatch]);

	return (
		<div>
			{loading ? (
				<h1>loading...</h1>
			) : (
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={
							<RestrictAuth>
								<Login />
							</RestrictAuth>
						}
					/>
					<Route
						path="/signup"
						element={
							<RestrictAuth>
								<Signup />
							</RestrictAuth>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
