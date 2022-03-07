import { useEffect } from "react";
import Base from "./Base";
import { useTitle } from "../Hooks/useTitle";
import { useSelector, useDispatch } from "react-redux";
import { fetchHomeFeed } from "../Actions/postAction";
import { PostCard } from "../Components";

const Home = () => {
	const { posts, loading, error } = useSelector(state => state.homeFeed);
	const dispatch = useDispatch();

	useTitle("Home");

	useEffect(() => {
		dispatch(fetchHomeFeed());
	}, [dispatch]);

	return (
		<Base>
			<div style={{ minWidth: "80%" }}>
				{error ? (
					<h3>{error}</h3>
				) : loading ? (
					<h1>Loading...</h1>
				) : (
					posts.map(post => <PostCard key={post.id} post={post} />)
				)}
			</div>
		</Base>
	);
};

export default Home;
