import { createContext, useContext, useEffect, useReducer } from "react";
import ax from '../utils/ax.jsx'
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
	CREATE_PROPERTY_SUCCESS,
	CREATE_PROPERTY_BEGIN,
	CREATE_PROPERTY_ERROR,
	READ_PROPERTIES_BEGIN,
	READ_PROPERTIES_SUCCESS,
	READ_PROPERTIES_ERROR,
	UPDATE_PROPERTY_BEGIN,
	UPDATE_PROPERTY_SUCCESS,
	UPDATE_PROPERTY_ERROR,
	CREATE_TENANT_BEGIN,
	CREATE_TENANT_SUCCESS,
	CREATE_TENANT_ERROR,
	READ_TENANTS_BEGIN,
	READ_TENANTS_SUCCESS,
	READ_TENANTS_ERROR,
	CREATE_UNIT_BEGIN,
	CREATE_UNIT_SUCCESS,
	CREATE_UNIT_ERROR,
	READ_UNITS_BEGIN,
	READ_UNITS_SUCCESS,
	READ_UNITS_ERROR,
	UPDATE_UNIT_BEGIN,
	UPDATE_UNIT_SUCCESS,
	UPDATE_UNIT_ERROR,
	DELETE_UNITS_BEGIN,
	DELETE_UNITS_SUCCESS,
	DELETE_UNITS_ERROR,
	CREATE_PAYMENT_BEGIN,
	CREATE_PAYMENT_SUCCESS,
	CREATE_PAYMENT_ERROR,
	READ_PAYMENTS_BEGIN,
	READ_PAYMENTS_SUCCESS,
	READ_PAYMENTS_ERROR,
} from "./actions.jsx";


const initialState = {
	role: 'public',
	showAlert: false,
	isLoading: false,
	alertType: '',
	alertText: '',
	user: null,
	properties: [],
	tenants: [],
	units: [],
	unit: null,
	payments: [],
	rents: [],
	property: []
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
		await ax('/auth/logout')
		dispatch({ type: LOGOUT_USER})
	}

/*----------------Properties------------------*/
	const readProperties = async () => {
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

/*----------------Units------------------*/
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

	const createUnit= async (unit) => {
		dispatch({type: CREATE_UNIT_BEGIN})
		console.log(unit);
		try {
			const response = await ax.post('/admin/units/create', unit)
			const {newUnit} = response.data
			dispatch({
				type: CREATE_UNIT_SUCCESS,
				payload: {newUnit}
			})
		} catch (error) {
			dispatch({
				type: CREATE_UNIT_ERROR,
				payload: {msg: error}
			})
		}
		clearAlert()
	}

	const getUnit = async (unit) => {
		dispatch({type: GET_UNIT_BEGIN})
		try {
			const response = await ax(`/admin/units/${unit}`)
			const {unit} = response.data
			dispatch({
				type: GET_UNIT_SUCCESS,
				payload: {unit}
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
		dispatch({ type: UPDATE_UNIT_BEGIN })
		try {
			const response = await ax.patch(`/admin/units/${unit._id}`, unit)
			const { unit } = response.data
			dispatch({
				type: UPDATE_UNIT_SUCCESS,
				payload: { unit }
			})
		} catch (error) {
			dispatch({
				type: UPDATE_UNIT_ERROR,
				payload: { msg: error}
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

	const createTenant = async (tenant) => {
		dispatch({type: CREATE_TENANT_BEGIN})
		try {
			const response = await ax.post('/admin/tenants/create', tenant)
			const {tenant} = response.data
			dispatch({
				type: CREATE_TENANT_SUCCESS,
				payload: {tenant}
			})
		} catch (error) {
			dispatch({
				type: CREATE_TENANT_ERROR,
				payload: {msg: error}
			})
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

	/*----------------Payments------------------*/
	const readPayments = async () => {
		dispatch({ type: READ_PAYMENTS_BEGIN })
		try {
			const response = await ax('/admin/payments')
			const { payments } = response.data
			dispatch({
				type: READ_PAYMENTS_SUCCESS,
				payload: { payments }
			})
		} catch (error) {
			dispatch({
				type: READ_PAYMENTS_ERROR,
				payload: { msg: error}
			})
		}
		clearAlert()
	}

	const createPayment= async (payment) => {
		dispatch({type: CREATE_PAYMENT_BEGIN})
		try {
			const response = await ax.post('/admin/payments/create', payment)
			const {payment} = response.data
			dispatch({
				type: CREATE_PAYMENT_SUCCESS,
				payload: {payment}
			})
		} catch (error) {
			dispatch({
				type: CREATE_PAYMENT_ERROR,
				payload: {msg: error}
			})
		}
		clearAlert()
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

				createProperty,
				readProperties,
				updateProperty,

				readUnits,
				createUnit,
				getUnit,

				createTenant,
				readTenants,
				getTenantDetails,

				createPayment,
				readPayments,

			}
		}>
			{ children }
		</GlobalContext.Provider>
	);
};
const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };