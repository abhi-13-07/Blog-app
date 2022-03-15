import React, { useEffect, useState } from "react";
import { Header, NavBar } from "../Components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWindowWidth } from "../Hooks/useWindowWidth";
import { logoutUser } from "../Actions/authAction";
import SideBar from "../Components/SideBar";

const Base = ({ children }) => {
	const [openSideBar, setOpenSideBar] = useState(false);
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const { width } = useWindowWidth();

	useEffect(() => {
		if (width > 540) {
			setOpenSideBar(false);
		}
	}, [width]);

	const handleLoginClick = () => {
		navigate("/login");
	};

	const handleSignupClick = () => {
		navigate("/signup");
	};

	const handleLogoutClick = () => {
		dispatch(logoutUser());
	};

	return (
		<div>
			<Header
				user={user}
				width={width}
				onLoginClick={handleLoginClick}
				onSignupClick={handleSignupClick}
				onLogoutClick={handleLogoutClick}
				onMenuClick={() => setOpenSideBar(true)}
			/>
			<div className="section">
				{width > 540 ? (
					<NavBar />
				) : (
					<SideBar
						user={user}
						open={openSideBar}
						onClose={() => setOpenSideBar(false)}
						onLoginClick={handleLoginClick}
						onSignupClick={handleSignupClick}
						onLogoutClick={handleLogoutClick}
					/>
				)}
				{children}
			</div>
		</div>
	);
};

export default Base;
