import {
	HOME_FEED_FAILURE,
	HOME_FEED_SUCCESS,
	HOME_FEED_REQUEST,
	POST_FIELD_CHANGE,
	POST_SUBMIT_FAILURE,
	POST_SUBMIT_SUCCESS,
	POST_SUBMIT_REQUEST,
	HOME_FEED_RELOAD,
	POST_DETAILS_REQUEST,
	POST_DETAILS_SUCCESS,
	POST_DETAILS_FAILURE,
	POST_DETAILS_RESET,
} from "../Constants/postConstants";

const initialHomeState = { posts: [], loading: false, error: null, reload: false };

export const homeFeedReducer = (state = initialHomeState, { type, payload }) => {
	switch (type) {
		case HOME_FEED_REQUEST:
			return { ...state, loading: true };
		case HOME_FEED_SUCCESS:
			return { ...state, loading: false, posts: payload, error: null, reload: false };
		case HOME_FEED_FAILURE:
			return { ...state, loading: false, error: payload, posts: [], reload: false };
		case HOME_FEED_RELOAD:
			return { ...state, reload: !state.reload };
		default:
			return state;
	}
};

const initialPostState = { title: "", body: "", loading: false, error: null };
export const postReducer = (state = initialPostState, { type, payload }) => {
	switch (type) {
		case POST_FIELD_CHANGE:
			return { ...state, ...payload };
		case POST_SUBMIT_REQUEST:
			return { ...state, loading: true };
		case POST_SUBMIT_SUCCESS:
			return { ...state, loading: false };
		case POST_SUBMIT_FAILURE:
			return { ...state, error: payload };
		case POST_DETAILS_REQUEST:
			return { ...state, loading: true };
		case POST_DETAILS_SUCCESS:
			return { ...state, loading: false, ...payload };
		case POST_DETAILS_FAILURE:
			return { ...state, loading: false, error: payload };
		case POST_DETAILS_RESET:
			return initialPostState;
		default:
			return state;
	}
};
