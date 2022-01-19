import React, { useState } from "react";
import Base from "./Base";
import { useTitle } from "../Hooks/useTitle";

const Home = () => {
	const [openSlideBar, setOpenSlidBar] = useState(false);
	useTitle("Home");

	return (
		<Base>
			<span>Home Page</span>
		</Base>
	);
};

export default Home;
