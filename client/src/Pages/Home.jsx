import React from "react";
import Base from "./Base";
import { useTitle } from "../Hooks/useTitle";

const Home = () => {
	useTitle("Home");

	return (
		<Base>
			<span>Home Page</span>
		</Base>
	);
};

export default Home;
