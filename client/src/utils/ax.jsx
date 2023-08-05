// axios
import axios from "axios";
import { config } from "../../constants.js";

const ax = axios.create({
	//baseURL: 'http://localhost:8800/api/v1',
	// baseURL: 'https://property-management-app.onrender.com/api/v1',
	baseURL: config.url.API_URL,
	withCredentials: true,
	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});
// response
ax.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// console.log(error.response)
		return Promise.reject(error);
	}
);

// to fetch fmr HUD data
const axHUD = axios.create({
	baseURL: import.meta.env.VITE_HUD_URL,
	headers : {
		Authorization : `Bearer ${import.meta.env.VITE_HUD_TOKEN}`
	}
})

// response
axHUD.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// console.log(error.response)
		return Promise.reject(error);
	}
);

export { ax, axHUD }