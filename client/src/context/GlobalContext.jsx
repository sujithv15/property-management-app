import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer.jsx";

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	LOGOUT_USER,
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

	return (
		<GlobalContext.Provider value={
			{
				...state
			}
		}>
			{ children }
		</GlobalContext.Provider>
	);
};
const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext };