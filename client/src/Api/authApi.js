import { get, post } from "./core";

export const login = async ({ email, password }) => {
	try {
		const { status, data } = await post("api/auth/login", { email, password });
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};

export const register = async ({ username, email, password1, password2 }) => {
	try {
		const { status, data } = await post("api/auth/register", {
			username,
			email,
			password1,
			password2,
		});
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};

export const logout = async () => {
	try {
		const { status, data } = await get("api/auth/logout");
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};

export const refreshToken = async () => {
	try {
		const { status, data } = await get("api/auth/refresh");
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};
