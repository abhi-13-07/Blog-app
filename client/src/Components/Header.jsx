import React from "react";
import PropTypes from "prop-types";
import { Button } from "./index";

const Header = ({ user, width }) => {
	return (
		<header className="header">
			<div className="brand-container">
				<h1 className="brand">Blog Post</h1>
			</div>
			<div className="btn-container">
				{!user ? (
					<>
						<Button label="Log-in" color="dark" btnStyle="outline" size="sm" />
						<Button label="Sign-up" color="dark" btnStyle="contained" size="sm" />
					</>
				) : (
					<Button label="Logout" color="dark" btnStyle="outline" size="sm" />
				)}
			</div>
		</header>
	);
};

Header.propTypes = {
	user: PropTypes.object,
	width: PropTypes.number,
};

export default Header;
