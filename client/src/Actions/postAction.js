import {
	HOME_FEED_REQUEST,
	HOME_FEED_SUCCESS,
	HOME_FEED_FAILURE,
} from "../Constants/postConstants";
import { getPosts } from "../Api/postsApi";

export const fetchHomeFeed = () => async dispatch => {
	dispatch({ type: HOME_FEED_REQUEST });
	try {
		const { status, data } = await getPosts();
		if (status === 200) {
			dispatch({ type: HOME_FEED_SUCCESS, payload: data });
			return;
		}
		return dispatch({ type: HOME_FEED_FAILURE, payload: data });
	} catch (err) {
		console.log(err);
	}
};
