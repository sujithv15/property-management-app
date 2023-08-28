import { createContext, useContext, useEffect, useReducer } from "react";
import { ax } from '../utils/ax.jsx'
import reducer from "./reducer.jsx";

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	GET_USERINFO_BEGIN,
	GET_USERINFO_SUCCESS,
	GET_USERINFO_ERROR,

	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_ERROR,
	LOGIN_USER_BEGIN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
	LOGOUT_USER,
	LOGIN_ADMIN_SUCCESS,
	READ_USERS_BEGIN,
	READ_USERS_SUCCESS,
	READ_USERS_ERROR,

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
	READ_REQUESTS_BEGIN,
	READ_REQUESTS_SUCCESS,
	READ_REQUESTS_ERROR,

	CREATE_MESSAGE,
	READ_MESSAGES_BEGIN,
	READ_MESSAGES_SUCCESS,
	READ_MESSAGES_ERROR,
	SET_UNREAD_MESSAGE_COUNT,

} from "./actions.jsx";

const initialState = {
	role: 'public',
	navLinks: [],
	showAlert: false,
	isLoading: false,
	alertType: '',
	alertText: '',
	adminID: '',
	user: {},
	users: [],
	units: [],
	unit: {},
	tenant: {},
	appliances: [],
	tenants: [],
	expenses: [],
	requests: [],
	messages: [],
	sentMessages: [],
	unreadMessageCount: 0,
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
	const registerUser = async (newUser) => {
		dispatch({ type: REGISTER_USER_BEGIN })
		try {
			const response = await ax.post('/auth/register', newUser)
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

	const getUsers = async () => {
		dispatch({ type: READ_USERS_BEGIN })
		try {
			const response = await ax('/admin/users')
			const { users } = response.data
			dispatch({
				type: READ_USERS_SUCCESS,
				payload: { users }
			})
		} catch (error) {
			dispatch({
				type: READ_USERS_ERROR,
				payload: { msg: error}
			})
		}
		clearAlert()
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
	// get unit details, populated with tenant details, appliances array, mortgage, and payments array, and adminID
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

	const getUserAccessibleDetails = async () => {
		dispatch({type: GET_USERINFO_BEGIN})
		try {
			const response = await ax('/user')
			const { unit, adminID } = response.data
			const { tenant, appliances } = unit
			const messages = await getMessages()
			dispatch({
				type: GET_USERINFO_SUCCESS,
				payload: { unit, tenant, appliances, messages, adminID }
			})
		} catch (error) {
			dispatch({
				type: GET_USERINFO_ERROR,
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
			console.log(tenants);
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
	const createTenant = async (tenant, newUser) => {
		try {
			const newTenant = await ax.post('/admin/tenants/create', tenant)
			const createdUser = await registerUser({ ...newUser, tenant: newTenant._id })
			await updateTenant(newTenant._id, { ...newTenant, user: createdUser })
			await getUnitDetails(tenant.unit)
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
			await readTenants()
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
			await readExpenses()
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

	/*----------------UserService Requests------------------*/
	const createServiceRequest = async (request) => {
		try {
			await ax.post('/user/requests/create', request)
		} catch (error) {
			console.log(error);
		}
		clearAlert()
	}
	/*----------------Admin Service Requests------------------*/
	const getServiceRequests = async () => {
		dispatch({ type: READ_REQUESTS_BEGIN })
		try {
			const response = await ax('/admin/requests')
			const { requests } = response.data
			dispatch({
				type: READ_REQUESTS_SUCCESS,
				payload: { requests }
			})
		} catch (error) {
			dispatch({
				type: READ_REQUESTS_ERROR,
				payload: { msg: error}
			})
		}
		clearAlert()
	}

	/*----------------MESSAGES------------------*/
	const createMessage = async (message) => {
		console.log(message);
		try {
			await ax.post(`/${state.role}/messages/create`, message)
			await getMessages()
		} catch (error) {
			console.log(error);
		}
		clearAlert()
	}

	const setUnreadMessageCount = async (messages) => {
		const unreadCount = messages.reduce((accumulator, message) => message.unread === true ? accumulator + 1 :  accumulator, 0)
		dispatch({
			type: SET_UNREAD_MESSAGE_COUNT,
			payload: { unreadCount }
		})
	}

	const getMessages = async () => {
		dispatch({ type: READ_MESSAGES_BEGIN })
		try {
			const response = await ax(`/${state.role}/messages`)
			const { messages } = response.data
			const responseSentMessages = await ax(`/${state.role}/messages/sent`)
			const { sentMessages } = responseSentMessages.data
			dispatch({
				type: READ_MESSAGES_SUCCESS,
				payload: { messages, sentMessages }
			})
			await setUnreadMessageCount(messages)
		} catch (error) {
			dispatch({
				type: READ_MESSAGES_ERROR,
				payload: { msg: error}
			})
		}
		clearAlert()
	}

	const toggleMessageRead = async (messageID) => {
		try{
			await ax.patch(`/${state.role}/messages/read`, messageID)
			await getMessages()
		} catch (error) {
			console.log(error);
		}
		clearAlert()
	}

	const toggleMessageUnread = async (messageID) => {
		try{
			await ax.patch(`/${state.role}/messages/unread`, messageID)
			await getMessages()
		} catch (error) {
			console.log(error);
		}
		clearAlert()
	}

	const toggleMessageFlag = async (messageID) => {
		try{
			await ax.patch(`/${state.role}/messages/flag`, messageID)
			await getMessages()
		} catch (error) {
			console.log(error);
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
				getUsers,

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
				updateAppliance,

				getUserAccessibleDetails,
				createServiceRequest,

				getServiceRequests,

				createMessage,
				getMessages,
				toggleMessageRead,
				toggleMessageUnread,
				toggleMessageFlag,

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