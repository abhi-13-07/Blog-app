import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ src, alt, size }) => {
	return <img className={`avatar avatar-${size}`} src={src} alt={alt} />;
};

Avatar.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Avatar;
