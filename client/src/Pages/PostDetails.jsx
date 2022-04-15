import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostDetails } from "../Actions/postAction";
import { POST_DETAILS_RESET } from "../Constants/postConstants";
import { MarkdownViewer } from "../Components/Editor";
import Base from "./Base";
import { Button } from "../Components";

const PostDetails = () => {
	const { title, body, loading, user } = useSelector(state => state.post);
	const {
		user: { id: userId },
	} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const { slug } = useParams();
	const navigate = useNavigate();

	const handleEditCick = id => {
		navigate(`/posts/edit/${id}`);
	};

	const handleDeleteClick = () => {};

	useEffect(() => {
		dispatch(fetchPostDetails(slug));

		return () => {
			dispatch({ type: POST_DETAILS_RESET });
		};
	}, [dispatch, slug]);

	return (
		<Base>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<h1 className="title" style={{ marginTop: 0 }}>
						{title}
					</h1>
					<div className="markdown-viewer">
						<MarkdownViewer src={body} />
					</div>
					{userId === user && (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-end",
								gap: "10px",
							}}
						>
							<Button
								size="sm"
								color="primary"
								label="Edit"
								btnStyle="contained"
								onClick={() => handleEditCick(slug)}
							/>
							<Button
								size="sm"
								color="danger"
								label="Delete"
								btnStyle="contained"
								onClick={() => handleDeleteClick()}
							/>
						</div>
					)}
				</div>
			)}
		</Base>
	);
};

export default PostDetails;
