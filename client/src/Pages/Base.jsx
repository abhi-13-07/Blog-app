import React from "react";
import { Header } from "../Components";
import { useNavigate } from "react-router-dom";

const Base = ({ children }) => {
	const navigate = useNavigate();

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
				onLoginClick={handleLoginClick}
				onSignupClick={handleSignupClick}
				onLogoutClick={handleLogoutClick}
			/>
			<div className="section">{children}</div>
		</div>
	);
};

export default Base;
