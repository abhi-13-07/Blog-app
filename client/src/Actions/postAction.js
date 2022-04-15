import {
	HOME_FEED_REQUEST,
	HOME_FEED_SUCCESS,
	HOME_FEED_FAILURE,
	POST_SUBMIT_REQUEST,
	POST_SUBMIT_SUCCESS,
	POST_SUBMIT_FAILURE,
	POST_DETAILS_REQUEST,
	POST_DETAILS_SUCCESS,
	POST_DETAILS_FAILURE,
} from "../Constants/postConstants";
import { getPost, getPosts, newPost } from "../Api/postsApi";
import store from "../store";

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

export const addNewPost =
	({ title, body }, callback) =>
	async dispatch => {
		const { accessToken } = store.getState().auth;

		dispatch({ type: POST_SUBMIT_REQUEST });
		try {
			const { status, data } = await newPost({ title, body }, accessToken);
			if (status === 201) {
				dispatch({ type: POST_SUBMIT_SUCCESS });
				callback();
				return;
			}
			dispatch({ type: POST_SUBMIT_FAILURE, payload: data });
		} catch (err) {
			console.log(err);
		}
	};

export const fetchPostDetails = slug => async dispatch => {
	dispatch({ type: POST_DETAILS_REQUEST });
	try {
		const { status, data } = await getPost(slug);
		if (status === 200) {
			dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
			return;
		}
		dispatch({ type: POST_DETAILS_FAILURE, payload: data });
	} catch (err) {
		console.log(err);
	}
};
