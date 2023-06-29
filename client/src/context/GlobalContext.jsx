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
	LOGIN_ADMIN_SUCCESS,
	LOGIN_ADMIN_ERROR,
	LOGIN_ADMIN_BEGIN,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	HANDLE_CHANGE,
	CLEAR_VALUES,
} from "./actions.jsx";
import {LOGOUT_ADMIN} from "./actions.jsx";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const admin = localStorage.getItem('admin')

const initialState = {
	isLoggedIn: false,
	showAlert: false,
	isLoading: false,
	alertText: '',
	alertType: '',
	user: null,
	admin: null,
	token: token,
	requests: '',
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
	// axios
	const authFetch = axios.create({
		baseURL: '/api/v1',
	});

	// request
	authFetch.interceptors.request.use(
		config => {
			config.headers['Authorization'] = `Bearer ${state.token}`
			return config
		},
		error => {
			return Promise.reject(error)
		}
	)

	// response
	authFetch.interceptors.response.use(
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

	// currentUser from login
	const loginUser = async (currentUser) => {
		dispatch({ type: LOGIN_USER_BEGIN })
		try {
			const response = await authFetch.post('/auth/login', currentUser)
			const { user, token } = response.data
			console.log(response.data);
			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: { user, token }
			})
			addUserToLocalStorage({ user, token })
		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: {msg: error}
			})
		}
		clearAlert()
	}

	const registerUser = async (currentUser) => {
		dispatch({ type: REGISTER_USER_BEGIN })
		try {
			const response = await axios.post('/auth/register', currentUser)
			console.log(response.data)
			const { user, token } = response.data
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: { user, token }
			})
			// addUserToLocalStorage({ user, token })
		} catch (error) {
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: {msg: error}
			})
		}
		clearAlert()
	}

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER})
		removeUserFromLocalStorage()
	}
	// currentAdmin from login
	const loginAdmin = async (currentAdmin) => {
		dispatch({ type: LOGIN_ADMIN_BEGIN })
		try {
			const response = await authFetch.post('/admin', currentAdmin)
			const { admin, token } = response.data
			console.log(response.data);
			dispatch({
				type: LOGIN_ADMIN_SUCCESS,
				payload: { admin, token }
			})
			addAdminToLocalStorage({ admin, token })
		} catch (error) {
			dispatch({
				type: LOGIN_ADMIN_ERROR,
				payload: {msg: error}
			})
		}
		clearAlert()
	}
	const logoutAdmin = () => {
		dispatch({ type: LOGOUT_ADMIN})
		removeAdminFromLocalStorage()
	}
	const addAdminToLocalStorage = ({ admin, token }) => {
		localStorage.setItem('admin', JSON.stringify(admin))
		localStorage.setItem('token', JSON.stringify(token))
	}

	const removeAdminFromLocalStorage = () => {
		localStorage.removeItem('admin')
		localStorage.removeItem('token')
	}

	const addUserToLocalStorage = ({ user, token }) => {
		localStorage.setItem('user', JSON.stringify(user))
		localStorage.setItem('token', JSON.stringify(token))
	}

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
	}
	return (
		<GlobalContext.Provider value={
			{
				...state,
				loginUser,
				logoutUser,
				loginAdmin,
				logoutAdmin,
				registerUser,
				displayAlert,
				clearAlert
			}
		}>
			{ children }
		</GlobalContext.Provider>
	);
};
const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };