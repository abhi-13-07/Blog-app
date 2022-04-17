import { get, post, put } from "./core";

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

export const getPost = async slug => {
	try {
		const { data, status } = await get(`details/${slug}`);
		return {
			data,
			status,
		};
	} catch (err) {
		console.clear();
	}
};

export const updatePost = async (slug, body, accessToken) => {
	try {
		const { data, status } = await put(`update/${slug}`, body, {
			Authorization: `Bearer ${accessToken}`,
		});

		return {
			data,
			status,
		};
	} catch (err) {
		console.clear();
	}
};
