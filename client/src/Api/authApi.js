import { post } from "./core";

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

export const logout = async refresh => {
	try {
		const { status, data } = await post("auth/logout/", { refresh });
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};

export const refreshToken = async ({ refresh }) => {
	try {
		const { status, data } = await post("auth/refresh/", { refresh });
		return {
			status,
			data,
		};
	} catch (err) {
		console.error(err);
	}
};
