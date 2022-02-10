import {
	LOGIN_REQUEST,
	LOGIN_SUCESS,
	LOGIN_FAILURE,
	SIGNUP_FAILURE,
	SIGNUP_REQUEST,
	SIGNUP_SUCESS,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	REFRESH_ACCESS_TOKEN_REQUEST,
	REFRESH_ACCESS_TOKEN_FAILURE,
	REFRESH_ACCESS_TOKEN_SUCCESS,
} from "../Constants/authConstants";

import { login, register, refreshToken, logout } from "../Api/authApi";
import { getUser } from "../Api/userApi";
import jwtDecode from "jwt-decode";

const REFRESH_TOKEN_KEY = "refreshToken";

export const loginUser = (credentials, onSuccess) => async dispatch => {
	try {
		dispatch({ type: LOGIN_REQUEST });
		const { status, data } = await login(credentials);
		if (status === 200) {
			localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
			dispatch({ type: LOGIN_SUCESS, payload: data });
			onSuccess && onSuccess();
			return;
		}
		return dispatch({ type: LOGIN_FAILURE, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const signup = (credentials, onSuccess) => async dispatch => {
	try {
		dispatch({ type: SIGNUP_REQUEST });
		const { status, data } = await register(credentials);
		if (status === 201) {
			localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
			dispatch({ type: SIGNUP_SUCESS, payload: data });
			onSuccess && onSuccess();
			return;
		}
		return dispatch({ type: SIGNUP_FAILURE, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const logoutUser = onSuccess => async dispatch => {
	try {
		dispatch({ type: LOGOUT_REQUEST });
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
		const { status } = await logout(refreshToken);
		if (status === 200) {
			dispatch({ type: LOGOUT_SUCCESS });
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			onSuccess && onSuccess();
			return;
		}
		return dispatch({ type: LOGOUT_FAILURE });
	} catch (err) {
		console.log(err);
	}
};

export const refreshAccessToken = callback => async dispatch => {
	try {
		dispatch({ type: REFRESH_ACCESS_TOKEN_REQUEST });
		const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
		if (!refresh) {
			dispatch({ type: REFRESH_ACCESS_TOKEN_FAILURE, payload: "Can't find refresh token" });
			typeof callback === "function" && callback();
			return;
		}
		const { status, data } = await refreshToken({ refresh });

		if (status === 200) {
			localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
			const user = await getUserInfo(data.access);
			const payloadData = { ...data, user };

			dispatch({ type: REFRESH_ACCESS_TOKEN_SUCCESS, payload: payloadData });
			typeof callback === "function" && callback();
			return;
		}

		dispatch({ type: REFRESH_ACCESS_TOKEN_FAILURE, payload: data.code });
		typeof callback === "function" && callback();
	} catch (err) {
		console.log("err", err);
		dispatch({ type: REFRESH_ACCESS_TOKEN_FAILURE });
		typeof callback === "function" && callback();
	}
};

async function getUserInfo(accessToken) {
	let user = null;
	try {
		const { user_id: id } = jwtDecode(accessToken);
		const { data, status } = await getUser(id, accessToken);
		if (status === 200) {
			user = data;
		}

		return user;
	} catch (err) {
		console.log("Error while get user info", err);
		return user;
	}
}
