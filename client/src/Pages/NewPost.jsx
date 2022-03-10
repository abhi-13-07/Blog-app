import { useState } from "react";
import { Button, Input } from "../Components";
import Base from "./Base";
import MDEditor from "@uiw/react-md-editor";
import Icon from "../Components/Icon";

const NewPost = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	return (
		<Base>
			<div style={{ width: "100%" }}>
				<div className="field">
					<label>Title</label>
					<Input
						type="text"
						placeholder="Title"
						onChange={e => setTitle(e.target.value)}
						value={title}
					/>
				</div>
				<div className="field">
					<label>Body</label>
					<MDEditor value={body} onChange={setBody} />
				</div>
				<Button size="md" color="primary" btnStyle="contained">
					<div>
						<Icon icon="fa-solid fa-plus" />
						<span style={{ marginLeft: "5px" }}>Add</span>
					</div>
				</Button>
			</div>
		</Base>
	);
};

export default NewPost;
