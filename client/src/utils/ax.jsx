// axios
import axios from "axios";
import { config } from "../../constants.js";

const ax = axios.create({
	//baseURL: 'http://localhost:8800/api/v1',
	// baseURL: 'https://property-management-app.onrender.com/api/v1',
	baseURL: config.url.API_URL,
	withCredentials: true
});
// response
ax.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// console.log(error.response)
		if (error.response.status === 401) {
			logoutUser();
		}
		return Promise.reject(error);
	}
);

export default ax