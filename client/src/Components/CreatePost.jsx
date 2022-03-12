import MDEditor from "@uiw/react-md-editor";
import React from "react";
import rehypeSanitize from "rehype-sanitize";
import Input from "./Input";

const CreatePost = ({ title, body, onChange }) => {
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
				<MDEditor
					value={body}
					onChange={val => onChange("body", val)}
					previewOptions={{
						rehypePlugins: [[rehypeSanitize]],
					}}
				/>
			</div>
		</form>
	);
};

export default CreatePost;
