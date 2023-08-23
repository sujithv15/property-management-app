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
	LOGIN_ADMIN_SUCCESS,

	CREATE_UNIT_BEGIN,
	CREATE_UNIT_SUCCESS,
	CREATE_UNIT_ERROR,

	READ_UNITS_BEGIN,
	READ_UNITS_SUCCESS,
	READ_UNITS_ERROR,

	GET_UNIT_BEGIN,
	GET_UNIT_SUCCESS,
	GET_UNIT_ERROR,

	UPDATE_UNIT_BEGIN,
	UPDATE_UNIT_SUCCESS,
	UPDATE_UNIT_ERROR,

	DELETE_UNIT_BEGIN,
	DELETE_UNIT_SUCCESS,
	DELETE_UNIT_ERROR,

	CREATE_TENANT_BEGIN,
	CREATE_TENANT_SUCCESS,
	CREATE_TENANT_ERROR,

	READ_TENANTS_BEGIN,
	READ_TENANTS_SUCCESS,
	READ_TENANTS_ERROR,

	UPDATE_TENANT_BEGIN,
	UPDATE_TENANT_SUCCESS,
	UPDATE_TENANT_ERROR,

	CREATE_EXPENSE_BEGIN,
	CREATE_EXPENSE_SUCCESS,
	CREATE_EXPENSE_ERROR,
	READ_EXPENSES_BEGIN,
	READ_EXPENSES_SUCCESS,
	READ_EXPENSES_ERROR,

} from "./actions.jsx";

import {initialState} from "./GlobalContext.jsx"


const Reducer = (state, action) => {

/*----------------Alerts------------------*/
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

/*----------------Register User------------------*/
	if (action.type === REGISTER_USER_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === REGISTER_USER_SUCCESS) {
		return {
			...state,
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

/*----------------Login/Logout------------------*/
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
			role: 'user',
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
	if (action.type === LOGIN_ADMIN_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			role: 'admin',
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'admin logged in! redirecting...'
		}
	}
	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
		};
	}



/*----------------Units------------------*/
	if (action.type === CREATE_UNIT_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === CREATE_UNIT_SUCCESS) {
		return {
			...state,
			units: [...state.units, action.payload.unit],
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'unit created! redirecting...'
		}
	}
	if (action.type === CREATE_UNIT_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}
	if (action.type === READ_UNITS_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === READ_UNITS_SUCCESS) {
		return {
			...state,
			units: action.payload.units,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'retrieving units...'
		}
	}
	// single unit
	if (action.type === READ_UNITS_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}
	if (action.type === GET_UNIT_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === GET_UNIT_SUCCESS) {
		return {
			...state,
			unit: action.payload.unit,
			tenant: action.payload.tenant,
			appliances: action.payload.appliances,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'retrieving unit...'
		}
	}
	if (action.type === GET_UNIT_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}
	if (action.type === UPDATE_UNIT_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === UPDATE_UNIT_SUCCESS) {
		return {
			...state,
			units: [...state.units, action.payload.unit],
			unit: action.payload.unit,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'updating unit...'
		}
	}
	if (action.type === UPDATE_UNIT_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}
	// add delete unit(s)

/*----------------Tenants------------------*/
	if (action.type === CREATE_TENANT_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === CREATE_TENANT_SUCCESS) {
		return {
			...state,
			tenant: action.payload.tenant,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'tenant created! redirecting...'
		}
	}
	if (action.type === CREATE_TENANT_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}
	if (action.type === READ_TENANTS_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === READ_TENANTS_SUCCESS) {
		return {
			...state,
			tenants: action.payload.tenants,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'retrieving tenants...'
		}
	}
	if (action.type === READ_TENANTS_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}

	if (action.type === UPDATE_TENANT_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === UPDATE_TENANT_SUCCESS) {
		return {
			...state,
			tenant: action.payload.tenant,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'updating unit...'
		}
	}
	if (action.type === UPDATE_TENANT_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}
	// FIX ME: Add tenant update/delete operations

/*----------------Payments------------------*/
	if (action.type === CREATE_EXPENSE_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === CREATE_EXPENSE_SUCCESS) {
		return {
			...state,
			payment: action.payload.expense,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'unit created! redirecting...'
		}
	}
	if (action.type === CREATE_EXPENSE_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg
		}
	}
	if (action.type === READ_EXPENSES_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === READ_EXPENSES_SUCCESS) {
		return {
			...state,
			expenses: action.payload.expenses,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'retrieving payments...'
		}
	}
	if (action.type === READ_EXPENSES_ERROR) {
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

