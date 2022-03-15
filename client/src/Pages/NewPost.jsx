import { useSelector, useDispatch } from "react-redux";
import { Button } from "../Components";
import Base from "./Base";
import Icon from "../Components/Icon";
import CreatePost from "../Components/CreatePost";
import { POST_FIELD_CHANGE } from "../Constants/postConstants";
import { addNewPost } from "../Actions/postAction";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
	const { title, body, loading, error } = useSelector(state => state.post);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (name, value) => {
		dispatch({ type: POST_FIELD_CHANGE, payload: { [name]: value } });
	};

	const handleSubmit = e => {
		dispatch(
			addNewPost({ title, body }, () => {
				navigate("/");
			})
		);
	};

	if (error) {
		return <pre>{JSON.stringify(error, null, 4)}</pre>;
	}

	return (
		<Base>
			<div style={{ width: "100%" }}>
				<CreatePost title={title} body={body} onChange={handleChange} />
				<div>
					<Button
						size="md"
						color="primary"
						btnStyle="contained"
						disabled={loading}
						onClick={handleSubmit}
					>
						<div>
							{!loading && <Icon icon="fa-solid fa-plus" />}
							<span style={{ marginLeft: "5px" }}>{!loading ? "Add" : "Publishing..."}</span>
						</div>
					</Button>
				</div>
			</div>
		</Base>
	);
};

export default NewPost;
