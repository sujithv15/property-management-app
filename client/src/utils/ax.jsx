// axios
import axios from "axios";
import { config } from "../../constants.js";

const ax = axios.create({
	//baseURL: 'http://localhost:8800/api/v1',
	// baseURL: 'https://property-management-app.onrender.com/api/v1',
	baseURL: config.url.API_URL,
	withCredentials: true,
});

// to fetch fmr HUD data
const axHUD = axios.create({
	baseURL: import.meta.env.VITE_HUD_URL,
	headers : {
		Authorization : `Bearer ${import.meta.env.VITE_HUD_TOKEN}`
	}
})


export { ax, axHUD }