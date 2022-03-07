import {
	HOME_FEED_FAILURE,
	HOME_FEED_SUCCESS,
	HOME_FEED_REQUEST,
} from "../Constants/postConstants";

const initialHomeState = { posts: [], loading: false, error: null };

export const homeFeedReducer = (state = initialHomeState, { type, payload }) => {
	switch (type) {
		case HOME_FEED_REQUEST:
			return { ...state, loading: true };
		case HOME_FEED_SUCCESS:
			return { ...state, loading: false, posts: payload, error: null };
		case HOME_FEED_FAILURE:
			return { ...state, loading: false, error: payload, posts: [] };
		default:
			return state;
	}
};
