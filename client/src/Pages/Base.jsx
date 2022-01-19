import React from "react";
import { Header, NavBar } from "../Components";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../Hooks/useWindowWidth";

const Base = ({ children }) => {
	const navigate = useNavigate();
	const { width } = useWindowWidth();

	const handleLoginClick = () => {
		navigate("/login");
	};

	const handleSignupClick = () => {
		navigate("/signup");
	};

	const handleLogoutClick = () => {
		navigate("/login");
	};

	return (
		<div>
			<Header
				width={width}
				onLoginClick={handleLoginClick}
				onSignupClick={handleSignupClick}
				onLogoutClick={handleLogoutClick}
			/>
			<div className="section">
				{width > 500 && <NavBar />}
				{children}
			</div>
		</div>
	);
};

export default Base;
