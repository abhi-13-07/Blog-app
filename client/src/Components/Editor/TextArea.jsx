import { useEditor } from "./Context/EditorProvider";

const TextArea = ({ disabled, width }) => {
	const { text, updateText, textAreaRef } = useEditor();

	const handleChange = e => {
		const { value } = e.target;
		updateText(value);
	};

	return (
		<textarea
			className="textarea"
			onChange={handleChange}
			disabled={disabled}
			ref={textAreaRef}
			style={{ width }}
			defaultValue={text}
			spellCheck="false"
		></textarea>
	);
};

export default TextArea;
