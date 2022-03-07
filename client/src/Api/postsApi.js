import { get } from "./core";
// import store from "../store";

// const { accessToken } = store.getState().auth;

export const getPosts = async () => {
	try {
		const { data, status } = await get("home/");
		return {
			data,
			status,
		};
	} catch (err) {
		console.clear();
	}
};

export const newPost = async ({ title, body }) => {
	//
};
