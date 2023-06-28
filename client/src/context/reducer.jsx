import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_ERROR,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_BEGIN,
	LOGIN_USER_ERROR,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	LOGIN_ADMIN_BEGIN,
	LOGIN_ADMIN_ERROR,
	LOGIN_ADMIN_SUCCESS,
	LOGOUT_ADMIN,
	TOGGLE_SIDEBAR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_REQUEST_SUCCESS,
	CREATE_REQUEST_BEGIN,
	CREATE_REQUEST_ERROR
} from "./actions.jsx";

import {initialState} from "./GlobalContext.jsx"

const Reducer = (state, action) => {

	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Please provide all values!'
		}
	}

	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: '',
			alertText: ''
		}
	}

	if (action.type === REGISTER_USER_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}

	if (action.type === REGISTER_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'user created! redirecting...'
		}
	}

	if (action.type === REGISTER_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}

	if (action.type === LOGIN_USER_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}

	if (action.type === LOGIN_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'user logged in! redirecting...'
		}
	}

	if (action.type === LOGIN_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}

	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			userLoading: false,
		};
	}

	if (action.type === LOGIN_ADMIN_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}

	if (action.type === LOGIN_ADMIN_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'user logged in! redirecting...'
		}
	}

	if (action.type === LOGIN_ADMIN_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}

	if (action.type === LOGOUT_ADMIN) {
		return {
			...initialState,
			userLoading: false,
		};
	}

	throw new Error(`No such action: ${action.type}`)
};

export default Reducer;