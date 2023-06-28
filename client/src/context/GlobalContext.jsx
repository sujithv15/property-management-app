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
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	HANDLE_CHANGE,
	CLEAR_VALUES,
} from "./actions.jsx";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
	isLoggedIn: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user:  null,
	token: null,
	requests: '',
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	// currentUser from login
	const loginUser = async (currentUser) => {
		dispatch({ type: LOGIN_USER_BEGIN })
		try {
			const response = await axios.post('http://localhost:8800/api/v1/auth/login', currentUser)
			const { user, token } = response.data
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
	}

	const registerUser = async (currentUser) => {
		dispatch({ type: REGISTER_USER_BEGIN })
		try {
			const response = await axios.post('http://localhost:8800/api/v1/auth/register', currentUser)
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
	}

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER})
		removeUserFromLocalStorage()
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
				registerUser
			}
		}>
			{ children }
		</GlobalContext.Provider>
	);
};
const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };