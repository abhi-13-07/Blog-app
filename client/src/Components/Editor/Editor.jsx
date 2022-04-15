import { useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { EditorProvider } from "./Context/EditorProvider";
import TextArea from "./TextArea";
import Preview from "./Preview";

const Editor = ({ value, onChange }) => {
	const [showPreview, setShowPreview] = useState(true);

	const togglePreview = e => {
		e.preventDefault();
		setShowPreview(prev => !prev);
	};

	return (
		<div className="editor">
			<EditorProvider value={value} onChange={onChange}>
				<Header togglePreview={togglePreview} />
				<div className="editor-body">
					<TextArea width={!showPreview && "100%"} />
					{showPreview && (
						<div className="preview">
							<Preview />
						</div>
					)}
				</div>
			</EditorProvider>
		</div>
	);
};

Editor.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default Editor;
