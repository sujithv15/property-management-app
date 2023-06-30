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
	CREATE_PROPERTY_SUCCESS,
	CREATE_PROPERTY_BEGIN,
	CREATE_PROPERTY_ERROR,
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
		};
	}

	if (action.type === CREATE_PROPERTY_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}

	if (action.type === CREATE_PROPERTY_SUCCESS) {
		return {
			...state,
			property: action.payload.property,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'user logged in! redirecting...'
		}
	}

	if (action.type === CREATE_PROPERTY_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}
	throw new Error(`No such action: ${action.type}`)
};

export default Reducer;