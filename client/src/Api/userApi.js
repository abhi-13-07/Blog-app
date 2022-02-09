import { get } from "./core";

export const getUser = async id => {
	try {
		const { status, data } = await get(``);
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};
