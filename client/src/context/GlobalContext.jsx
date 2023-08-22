import { createContext, useContext, useEffect, useReducer } from "react";
import { ax } from '../utils/ax.jsx'
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

	UPDATE_TENANT_BEGIN,
	UPDATE_TENANT_SUCCESS,
	UPDATE_TENANT_ERROR,
	READ_TENANTS_BEGIN,
	READ_TENANTS_SUCCESS,
	READ_TENANTS_ERROR,


	CREATE_EXPENSE_BEGIN,
	CREATE_EXPENSE_SUCCESS,
	CREATE_EXPENSE_ERROR,
	READ_EXPENSES_BEGIN,
	READ_EXPENSES_SUCCESS,
	READ_EXPENSES_ERROR,

} from "./actions.jsx";


const initialState = {
	role: 'public',
	showAlert: false,
	isLoading: false,
	alertType: '',
	alertText: '',
	user: {} ,
	units: [],
	unit: {},
	tenant: {},
	appliances: [],
	tenants: [],
	expenses: [],
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

/*----------------Alerts------------------*/
	const displayAlert = (alertText) => {
		dispatch({ type: DISPLAY_ALERT })
		clearAlert()
	}

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, 3000)
	}

/*----------------User------------------*/
	const registerUser = async (currentUser) => {
		dispatch({ type: REGISTER_USER_BEGIN })
		try {
			const response = await ax.post('/auth/register', currentUser)
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

	const loginUser = async (currentUser) => {
		dispatch({ type: LOGIN_USER_BEGIN })
		try {
			const response = await ax.post('/auth/login', currentUser)
			const { user } = response.data
			if (user.isAdmin) {
				dispatch({
					type: LOGIN_ADMIN_SUCCESS,
					payload: { user }
				})
			} else {
				dispatch({
					type: LOGIN_USER_SUCCESS,
					payload: { user }
				})
			}
		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: { msg: error }
			})
		}
		clearAlert()
	}

	const logoutUser = async () => {
		dispatch({
			type: LOGOUT_USER
		})
		await ax('/auth/logout')
	}


/*----------------Units------------------*/
	const createUnit= async (unit) => {
		try {
			await ax.post('/admin/units/create', unit)
			await readUnits()
		} catch (error) {
			console.log('Unit could not be created');
		}
		clearAlert()
	}

	const readUnits = async () => {
		dispatch({ type: READ_UNITS_BEGIN })
		try {
			const response = await ax('/admin/units')
			const { units } = response.data
			dispatch({
				type: READ_UNITS_SUCCESS,
				payload: { units }
			})
		} catch (error) {
			dispatch({
				type: READ_UNITS_ERROR,
				payload: { msg: error}
			})
		}
		clearAlert()
	}
	// get unit details, populated with tenant details, appliances array, mortgage, and payments array
	const getUnitDetails = async (unit_id) => {
		dispatch({type: GET_UNIT_BEGIN})
		try {
			const response = await ax(`/admin/units/${unit_id}`)
			const { unit } = response.data
			const { tenant, appliances } = unit
			dispatch({
				type: GET_UNIT_SUCCESS,
				payload: { unit, tenant, appliances }
			})
		} catch (error) {
			dispatch({
				type: GET_UNIT_ERROR,
				payload: {msg: error}
			})
		}
		clearAlert()
	}
	const updateUnit = async (unit) => {
		dispatch({type: UPDATE_UNIT_BEGIN})
		try {
			await ax.patch(`/admin/units/${unit._id}`, unit)
			await readUnits()
			dispatch({
				type: UPDATE_UNIT_SUCCESS,
				payload: { unit }
			})
		} catch (error) {
			dispatch({
				type: UPDATE_UNIT_ERROR,
				payload: {msg: error}
			})
		}
		clearAlert()
	}


	/*----------------Tenants------------------*/
	const readTenants = async () => {
		dispatch({ type: READ_TENANTS_BEGIN })
		try {
			const response = await ax('/admin/tenants')
			const { tenants } = response.data
			dispatch({
				type: READ_TENANTS_SUCCESS,
				payload: { tenants }
			})
		} catch (error) {
			dispatch({
				type: READ_TENANTS_ERROR,
				payload: { msg: error}
			})
		}
		clearAlert()
	}

	// global states set up in getUnitDetails for tenant
	const createTenant = async (tenant, unit_id) => {
		try {
			await ax.post('/admin/tenants/create', tenant)
			await getUnitDetails(unit_id)
		} catch (error) {
			console.log(error);
		}
		clearAlert()
	}

	const getTenantDetails = async (tenant_id) => {
		try {
			const response = await ax(`/admin/tenants/${tenant_id}`)
			const { tenant } = response.data
		} catch (error) {
			throw new Error(error)
		}
		clearAlert()
	}

	const updateTenant = async (tenant_id, tenant) => {
		dispatch({ type: UPDATE_TENANT_BEGIN })
		try {
			await ax.patch(`/admin/tenants/${tenant._id}`, tenant)
			dispatch({
				type: UPDATE_TENANT_SUCCESS,
				payload: { tenant }
			})
		} catch (error) {
			dispatch({
				type: UPDATE_TENANT_ERROR,
				payload: { msg: error}
			})
		}
		clearAlert()
	}

	/*----------------Expenses------------------*/
	const readExpenses = async () => {
		dispatch({ type: READ_EXPENSES_BEGIN })
		try {
			const response = await ax('/admin/accounting')
			const { expenses } = response.data
			dispatch({
				type: READ_EXPENSES_SUCCESS,
				payload: { expenses }
			})
		} catch (error) {
			dispatch({
				type: READ_EXPENSES_ERROR,
				payload: { msg: error}
			})
		}
		clearAlert()
	}

	const createExpense= async (expense) => {
		try {
			await ax.post('/admin/accounting/create', expense)
			await readExpenses()
		} catch (error) {
			console.log(error);
		}
		clearAlert()
	}

	const updateExpense= async (expense) => {
		try {
			await ax.post(`/admin/accounting/${expense._id}`, expense)
		} catch (error) {
			console.log(error);
		}
		clearAlert()
	}
	/*----------------Appliances------------------*/
	const createAppliance= async (appliance) => {
		try {
			await ax.post('/admin/appliances/new', appliance)
			getUnitDetails(appliance.unit)
		} catch (error) {
			console.log(error);
		}
		clearAlert()
	}

	const updateAppliance = async (appliance) => {
		try {
			await ax.patch(`/admin/appliances/${appliance._id}`, appliance)
			getUnitDetails(appliance.unit)
		} catch (error) {
			console.log(error);
		}
		clearAlert()
	}

	/*----------------Handling file uploads------------------*/
	// directory: simplify all post uploads into one function
	// -we can specify directory based on what we are uploading using our server
	// -ex. directory='appliances' for create new appliance image/receipt image
	// -ex. directory='tenant' for leases, etc.
	const createPost = async (directory, post) => {
		try {
			await ax.post(`/admin/${directory}/upload`, post)
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<GlobalContext.Provider value={
			{
				...state,
				ax,
				loginUser,
				logoutUser,
				registerUser,

				displayAlert,
				clearAlert,

				readUnits,
				createUnit,
				getUnitDetails,
				updateUnit,

				createTenant,
				readTenants,
				updateTenant,

				createExpense,
				readExpenses,
				updateExpense,

				createAppliance,
				updateAppliance

			}
		}>
			{ children }
		</GlobalContext.Provider>
	);
};
const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };








 /*----------------Properties------------------*/

/*
CREATE_PROPERTY_SUCCESS,
	CREATE_PROPERTY_BEGIN,
	CREATE_PROPERTY_ERROR,
	READ_PROPERTIES_BEGIN,
	READ_PROPERTIES_SUCCESS,
	READ_PROPERTIES_ERROR,
	UPDATE_PROPERTY_BEGIN,
	UPDATE_PROPERTY_SUCCESS,
	UPDATE_PROPERTY_ERROR,

*/

/*const readProperties = async () => {
	dispatch({ type: READ_PROPERTIES_BEGIN })
	try {
		const response = await ax('/admin/properties')
		const { properties } = response.data
		dispatch({
			type: READ_PROPERTIES_SUCCESS,
			payload: { properties }
		})
	} catch (error) {
		dispatch({
			type: READ_PROPERTIES_ERROR,
			payload: { msg: error}
		})
	}
	clearAlert()
}

const createProperty = async (property) => {
	dispatch({ type: CREATE_PROPERTY_BEGIN })

	try {
		await ax.post('/admin/properties/create', property)
		dispatch({
			type: CREATE_PROPERTY_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: CREATE_PROPERTY_ERROR,
			payload: { msg: error}
		})
	}
	clearAlert()
}

const updateProperty = async (property) => {
	dispatch({ type: UPDATE_PROPERTY_BEGIN })
	try {
		const response = await ax.patch(`/admin/properties/${property._id}`, property)
		const { property } = response.data
		dispatch({
			type: UPDATE_PROPERTY_SUCCESS,
			payload: { property }
		})
	} catch (error) {
		dispatch({
			type: UPDATE_PROPERTY_ERROR,
			payload: { msg: error}
		})
	}
	clearAlert()
}
 */