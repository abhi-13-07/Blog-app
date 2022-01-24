import axios from "axios";
import { apiBaseURL } from "./baseURL";

const getData = async request => {
	try {
		const data = await request;
		return { status: data.status, data };
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

export const get = url => {
	return getData(axios.get(`${apiBaseURL}/${url}`));
};

export const post = (url, body) => {
	return getData(axios.post(`${apiBaseURL}/${url}`, body));
};

export const put = (url, body) => {
	return getData(axios.put(`${apiBaseURL}/${url}`, body));
};

export const deleteReq = url => {
	return getData(axios.delete(`${apiBaseURL}/${url}`));
};
