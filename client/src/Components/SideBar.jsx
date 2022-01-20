import React from "react";
import PropTypes from "prop-types";
import { Button, NavBar } from ".";

const SideBar = ({ open, onClose, onLoginClick, onSignupClick, onLogoutClick, user }) => {
	return (
		<div className={`${open && "sidebar-container"}`}>
			<div className={`sidebar sidebar-${open ? "open" : "close"}`}>
				<div className="sidebar-header">
					<h1 className="brand">Blog Post</h1>
					<span className="close" onClick={onClose}>
						+
					</span>
				</div>
				<div className="sidebar-body">
					<NavBar />
				</div>

				<div className="sidebar-footer">
					{!user ? (
						<>
							<Button
								label="Log-in"
								color="dark"
								size="sm"
								btnStyle="outline"
								onClick={onLoginClick}
							/>
							<br />
							<Button
								label="Sign-up"
								color="dark"
								size="sm"
								btnStyle="contained"
								onClick={onSignupClick}
							/>
						</>
					) : (
						<Button
							label="Logout"
							color="dark"
							size="sm"
							btnStyle="outline"
							onClick={onLogoutClick}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

SideBar.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onLoginClick: PropTypes.func,
	onSignupClick: PropTypes.func,
	onLogoutClick: PropTypes.func,
	user: PropTypes.object,
};

export default SideBar;
