import React from "react";
import PropTypes from "prop-types";
import { Button } from "./index";

const Header = ({ user, width, onLoginClick, onSignupClick, onLogoutClick }) => {
	return (
		<header className="header">
			<div className="brand-container">
				<h1 className="brand">Blog Post</h1>
			</div>
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
					<Button
						label="Logout"
						color="dark"
						btnStyle="outline"
						size="sm"
						onClick={onLogoutClick}
					/>
				)}
			</div>
		</header>
	);
};

Header.propTypes = {
	user: PropTypes.object,
	width: PropTypes.number,
	onLoginClick: PropTypes.func,
	onSignupClick: PropTypes.func,
	onLogoutClick: PropTypes.func,
};

export default Header;
