import axios from "axios";
import { apiBaseURL } from "./baseURL";

const getData = async request => {
	try {
		const { status, data } = await request;
		return { status, data };
	} catch (err) {
		const { response } = err || { response: null };
		if (response) {
			console.clear();
			return {
				status: response.status,
				data: response.data,
			};
		}
		console.error(err);
	}
};

export const get = (url, headers = null) => {
	return getData(axios.get(`${apiBaseURL}/${url}`, { headers }));
};

export const post = (url, body, headers = null) => {
	return getData(axios.post(`${apiBaseURL}/${url}`, body, { headers }));
};

export const put = (url, body, headers = null) => {
	return getData(axios.put(`${apiBaseURL}/${url}`, body, { headers }));
};

export const deleteReq = (url, headers = null) => {
	return getData(axios.delete(`${apiBaseURL}/${url}`, { headers }));
};
