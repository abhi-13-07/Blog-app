import { useCallback } from "react";
import { useEditor } from "./Context/EditorProvider";
import "highlight.js/styles/tokyo-night-dark.css";
import { parseMarkdown } from "./utils/parseMarkdown";

const Preview = () => {
	const { text } = useEditor();

	const getHtml = useCallback(() => {
		return parseMarkdown(text);
	}, [text]);

	return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: getHtml() }}></div>;
};

export default Preview;
