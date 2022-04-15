import { useCallback } from "react";
import { Editor } from "./Editor";
import React from "react";
import Input from "./Input";

const CreatePost = ({ title, body, onChange }) => {
	const handleChange = useCallback(val => onChange("body", val), [onChange]);

	return (
		<form>
			<div className="field">
				<label>Title</label>
				<Input
					type="text"
					placeholder="Title"
					onChange={e => onChange("title", e.target.value)}
					value={title}
				/>
			</div>
			<div className="field">
				<label>Body</label>
				<Editor value={body} onChange={handleChange} />
			</div>
		</form>
	);
};

export default CreatePost;
