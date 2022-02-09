import jwtDecode from "jwt-decode";
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
} from "../Constants/authConstants";

const initialAuthState = {
	user: null,
	accessToken: null,
	expiresIn: 0,
	error: null,
	loading: false,
};

export const authReducer = (state = initialAuthState, { type, payload }) => {
	switch (type) {
		case LOGIN_REQUEST:
		case SIGNUP_REQUEST:
		case LOGOUT_REQUEST:
			return { ...state, loading: true };
		case LOGIN_SUCESS:
		case SIGNUP_SUCESS:
			const { expiresIn } = jwtDecode(payload.access);

			return {
				...state,
				accessToken: payload.access,
				user: payload.user,
				expiresIn,
				loading: false,
				error: false,
			};
		case LOGIN_FAILURE:
		case SIGNUP_FAILURE:
		case LOGOUT_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case LOGOUT_SUCCESS:
			return initialAuthState;
		default:
			return state;
	}
};
