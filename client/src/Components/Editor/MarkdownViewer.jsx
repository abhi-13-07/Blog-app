import React from "react";
import PropTypes from "prop-types";
import { parseMarkdown } from "./utils/parseMarkdown";

const MarkdownViewer = ({ src }) => {
	return (
		<div className="markdown-body" dangerouslySetInnerHTML={{ __html: parseMarkdown(src) }}></div>
	);
};

MarkdownViewer.propTypes = {
	src: PropTypes.string,
};

export default MarkdownViewer;
