import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "../Components";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
	const user = post.user;
	const userDetails = post.user_details;

	const prefix = "http://localhost:8000/";
	const userProfilePic = prefix + userDetails.profile_image;

	return (
		<div className="post-card">
			<div>
				<Link to={`users/${user}`} className="user-details">
					<Avatar src={userProfilePic} alt={userDetails.username} size="sm" />
					<span>{userDetails.username}</span>
				</Link>
			</div>
			<div>
				<Link to={`/posts/${post.slug}`} className="post-title">
					<h1>{post.title}</h1>
				</Link>
			</div>
			<div className="tags-container">
				{post.tags?.map(tag => (
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
