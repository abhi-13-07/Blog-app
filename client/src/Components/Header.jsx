import React from "react";
import PropTypes from "prop-types";
import { Button } from "./index";

const Header = ({ user, width, onLoginClick, onSignupClick, onLogoutClick, onMenuClick }) => {
	const isMobileView = width <= 500;

	return (
		<header className="header">
			{isMobileView && (
				<div className="menu" onClick={onMenuClick}>
					<i className="fas fa-bars"></i>
				</div>
			)}
			<div className="brand-container">
				<h1 className="brand">Blog Post</h1>
			</div>
			{!isMobileView && (
				<div className="btn-container">
					{!user ? (
						<>
							<Button
								label="Log-in"
								color="dark"
								btnStyle="outline"
								size="sm"
								onClick={onLoginClick}
							/>
							<Button
								label="Sign-up"
								color="dark"
								btnStyle="contained"
								size="sm"
								onClick={onSignupClick}
							/>
						</>
					) : (
						<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
							<span>Hello, {user.username}</span>
							<Button
								label="Logout"
								color="dark"
								btnStyle="outline"
								size="sm"
								onClick={onLogoutClick}
							/>
						</div>
					)}
				</div>
			)}
			{isMobileView && <div></div>}
		</header>
	);
};

Header.propTypes = {
	user: PropTypes.object,
	width: PropTypes.number,
	onLoginClick: PropTypes.func,
	onSignupClick: PropTypes.func,
	onLogoutClick: PropTypes.func,
	onMenuClick: PropTypes.func,
};

export default Header;
