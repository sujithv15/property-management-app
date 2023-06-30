import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer.jsx";

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_ERROR,
	LOGIN_USER_BEGIN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
	LOGOUT_USER,
	CREATE_PROPERTY_SUCCESS,
	CREATE_PROPERTY_BEGIN,
	CREATE_PROPERTY_ERROR,
} from "./actions.jsx";


const initialState = {
	isLoggedIn: false,
	showAlert: false,
	isLoading: false,
	alertType: '',
	alertText: '',
	user: null,
	properties: null
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
	// axios
	const ax = axios.create({
		baseURL: 'http://localhost:8800/api/v1',
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

	const [state, dispatch] = useReducer(reducer, initialState)

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT })
		clearAlert()
	}

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, 3000)
	}

	const registerUser = async (currentUser) => {
		dispatch({ type: REGISTER_USER_BEGIN })
		try {
			const response = await ax.post('/authenticate/register', currentUser)
			const { user } = response.data
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: { user }
			})
		} catch (error) {
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: { msg: error }
			})
		}
		clearAlert()
	}

	// currentUser from login
	const loginUser = async (currentUser) => {
		dispatch({ type: LOGIN_USER_BEGIN })
		try {
			const response = await ax.post('/authenticate/login', currentUser)
			const { user } = response.data
			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: { user }
			})
		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: { msg: error }
			})
		}
		clearAlert()
	}

	const logoutUser = async () => {
		await ax('/authenticate/logout')
		dispatch({ type: LOGOUT_USER})
	}

	const createProperty = async (property) => {
		dispatch({ type: CREATE_PROPERTY_BEGIN })
		try {
			const response = await ax.post('/admin/properties/new', property)
			const { property } = response.data
			dispatch({
				type: CREATE_PROPERTY_SUCCESS,
				payload: { property }
			})
		} catch (error) {
			dispatch({
				type: CREATE_PROPERTY_ERROR,
				payload: { msg: error}
			})
		}
		clearAlert()
	}

	return (
		<GlobalContext.Provider value={
			{
				...state,
				loginUser,
				logoutUser,
				registerUser,
				displayAlert,
				clearAlert,
				createProperty
			}
		}>
			{ children }
		</GlobalContext.Provider>
	);
};
const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };