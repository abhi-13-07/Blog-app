import React from "react";
import { Header } from "../Components";

const Base = ({ children }) => {
	return (
		<div>
			<Header />
			<div className="section">{children}</div>
		</div>
	);
};

export default Base;
