import { get } from "./core";

export const getUser = async (id, accessToken) => {
	try {
		const { status, data } = await get(`user/${id}`, {
			Authorization: `Bearer ${accessToken}`,
		});
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};
