import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, CreatePost, Icon } from "../Components";
import Base from "./Base";
import { fetchPostDetails } from "../Actions/postAction";
import { POST_DETAILS_RESET } from "../Constants/postConstants";

const EditPost = () => {
	const { loading, title, body } = useSelector(state => state.post);
	const { slug } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchPostDetails(slug));

		return () => {
			dispatch({ type: POST_DETAILS_RESET });
		};
	}, [dispatch, slug]);

	const handleChange = () => {
		//
	};

	const handleSubmit = () => {
		//
	};

	return (
		<Base>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div style={{ width: "100%" }}>
					<CreatePost title={title} body={body} onChange={handleChange} />
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							gap: "10px",
						}}
					>
						<Button
							size="md"
							color="dark"
							btnStyle="contained"
							label="Back"
							onClick={() => navigate(-1)}
						/>
						<Button
							size="md"
							color="primary"
							btnStyle="contained"
							disabled={loading}
							onClick={handleSubmit}
						>
							<div>
								{!loading && <Icon icon="fa-solid fa-plus" />}
								<span style={{ marginLeft: "5px" }}>{!loading ? "Update" : "Updating..."}</span>
							</div>
						</Button>
					</div>
				</div>
			)}
		</Base>
	);
};

export default EditPost;
