import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowWidth } from "../Hooks/useWindowWidth";
import Icon from "./Icon";

const NavBar = () => {
	const location = useLocation();
	const { width } = useWindowWidth();

	const canShowLabel = width > 1140 || width <= 540;

	const isActive = path => {
		return path === location.pathname;
	};

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link to="/" className={`nav-link ${isActive("/") && `active`}`}>
						<div>
							<Icon icon="fa-solid fa-house fa-lg" />
						</div>
						{canShowLabel && <span>Home</span>}
					</Link>
				</li>
				<li>
					<Link to="/saved" className="nav-link">
						<div>
							<Icon icon="fa-solid fa-bookmark fa-lg" />
						</div>
						{canShowLabel && <span>Saved</span>}
					</Link>
				</li>
				<li>
					<Link to="/me" className="nav-link">
						<div>
							<Icon icon="fa-solid fa-user fa-lg" />
						</div>
						{canShowLabel && <span>Profile</span>}
					</Link>
				</li>
				<li>
					<Link to="/posts/new" className="nav-link">
						<Icon icon="fa-solid fa-plus fa-lg" />
						{canShowLabel && <span>New Post</span>}
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
