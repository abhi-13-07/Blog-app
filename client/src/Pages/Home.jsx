import React from "react";
import Base from "./Base";
import { useTitle } from "../Hooks/useTitle";

const Home = () => {
	useTitle("Blog App | Home");
	return (
		<Base>
			<h1>Home Page</h1>
		</Base>
	);
};

export default Home;
