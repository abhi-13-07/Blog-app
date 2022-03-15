import { combineReducers } from "redux";
import { authReducer } from "./authReducers";
import { homeFeedReducer, postReducer } from "./postReducer";

export const rootReducer = combineReducers({
	auth: authReducer,
	homeFeed: homeFeedReducer,
	post: postReducer,
});
