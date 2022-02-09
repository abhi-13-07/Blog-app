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

export const loginUser = (credentials, onSuccess) => async dispatch => {
	try {
		dispatch({ type: LOGIN_REQUEST });
		const { status, data } = await login(credentials);
		if (status === 200) {
			localStorage.setItem("refreshToken", data.refresh);
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
			localStorage.setItem("refreshToken", data.refresh);
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
		const { status } = await logout();
		if (status === 200) {
			dispatch({ type: LOGOUT_SUCCESS });
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
		const refresh = localStorage.getItem("refreshToken");
		if (!refresh) {
			dispatch({ type: REFRESH_ACCESS_TOKEN_FAILURE, payload: "Can't find refresh token" });
			callback && callback();
			return;
		}
		const { status, data } = refreshToken({ refreshToken: refresh });
		if (status === 200) {
			dispatch({ type: REFRESH_ACCESS_TOKEN_SUCCESS, payload: data.access });
			callback && callback();
			return;
		}
		dispatch({ type: REFRESH_ACCESS_TOKEN_FAILURE, payload: data.code });
		callback && callback();
	} catch (err) {
		console.log(err);
	}
};
