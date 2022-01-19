import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
	const location = useLocation();

	const isActive = path => {
		return path === location.pathname;
	};

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link to="/" className={`nav-link ${isActive("/") && `active`}`}>
						<i className={`fas fa-home`}></i>
						Home
					</Link>
				</li>
				<li>
					<Link to="/saved" className="nav-link">
						<i className="fas fa-bookmark"></i>
						Saved
					</Link>
				</li>
				<li>
					<Link to="/me" className="nav-link">
						<i className="fas fa-user"></i>
						Profile
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
