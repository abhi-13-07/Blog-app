import { get, post } from "./core";

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

export const newPost = async ({ title, body }, accessToken) => {
	try {
		const { data, status } = await post(
			"create/",
			{
				title,
				body,
			},
			{ Authorization: `Bearer ${accessToken}` }
		);
		return {
			data,
			status,
		};
	} catch (err) {
		console.clear();
	}
};
