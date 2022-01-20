import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "../Components";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
	const user = post.createdBy;

	return (
		<div className="post-card">
			<div>
				<Link to={`users/${user.id}`} className="user-details">
					<Avatar src={user.displayPicture} alt={user.firstname} size="sm" />
					<span>{`${user.firstname} ${user?.lastname}`}</span>
				</Link>
			</div>
			<div>
				<Link to={`/posts/${post.id}`} className="post-title">
					<h1>{post.title}</h1>
				</Link>
			</div>
			<div className="tags-container">
				{post.tags.map(tag => (
					<Link className="tag" key={tag?.id || tag} to={`/tags/${tag}`}>
						<small key={tag.id}>#{tag}</small>
					</Link>
				))}
			</div>
			<div></div>
		</div>
	);
};

PostCard.propTypes = {
	post: PropTypes.object,
};

export default PostCard;
