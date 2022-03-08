import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon";

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
						<Icon icon="fa-solid fa-house fa-lg" />
						<span>Home</span>
					</Link>
				</li>
				<li>
					<Link to="/saved" className="nav-link">
						<Icon icon="fa-solid fa-bookmark fa-lg" />
						<span>Saved</span>
					</Link>
				</li>
				<li>
					<Link to="/me" className="nav-link">
						<Icon icon="fa-solid fa-user fa-lg" />
						<span>Profile</span>
					</Link>
				</li>
				<li>
					<Link to="/me" className="nav-link">
						<Icon icon="fa-solid fa-plus fa-lg" />
						<span>New Post</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
