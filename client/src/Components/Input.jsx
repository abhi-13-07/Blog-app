import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(({ type, placeholder, onChange, disabled, value, ...rest }, ref) => {
	return (
		<input
			ref={ref}
			type={type}
			placeholder={placeholder}
			disabled={disabled}
			value={value}
			onChange={onChange}
			{...rest}
		/>
	);
});

Input.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	value: PropTypes.string,
	rest: PropTypes.object,
};

export default Input;
