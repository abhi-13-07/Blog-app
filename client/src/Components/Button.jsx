import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, btnStyle, size, color, disabled, onClick }) => {
	return (
		<button
			className={`btn btn-${size} btn-${color}-${btnStyle}`}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

Button.propTypes = {
	label: PropTypes.string,
	btnStyle: PropTypes.oneOf(["contained", "outline"]),
	size: PropTypes.oneOf(["sm", "md", "lg", "block"]),
	color: PropTypes.oneOf(["primary", "dark", "danger"]),
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Button;
