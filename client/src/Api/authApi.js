import { get, post } from "./core";

export const login = async ({ username, password }) => {
	try {
		const { status, data } = await post("auth/login/", { username, password });
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
		const { status, data } = await post("auth/register/", {
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
		const { status, data } = await get("auth/logout/");
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};

export const refreshToken = async ({ refreshToken }) => {
	try {
		const { status, data } = await post("auth/refresh/", { refreshToken });
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};
