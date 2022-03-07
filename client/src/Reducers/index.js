import { combineReducers } from "redux";
import { authReducer } from "./authReducers";
import { homeFeedReducer } from "./postReducer";

export const rootReducer = combineReducers({
	auth: authReducer,
	homeFeed: homeFeedReducer,
});
