import { get } from "./core";
import store from "../store";

const { accessToken } = store.getState().auth;

export const getPosts = async () => {
	try {
		const { data, status } = await get("/home/", { Authorization: `Bearer ${accessToken}` });
		return {
			data,
			status,
		};
	} catch (err) {
		console.clear();
	}
};
