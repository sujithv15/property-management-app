import FormRow from "./FormRow.jsx";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";

const initialState = {
	name: '',
	email: '',
	password: '',
}

const LoginForm = () => {

	// new state values for user input values
	const [values, setValues] = useState(initialState)

	// function in our GlobalContext to login user to server
	const { user, isLoading, showAlert, displayAlert, Alert, clearAlert, loginUser, logoutUser } = useGlobalContext()

	// set state values as user types
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	// loginUser function calls api with post request to validate login info
	// context will set state.user and isAdmin appropriately
	const handleSubmit = (e) => {
		e.preventDefault()
		const {email, password} = values
		if (!email || !password) {
			displayAlert()
			clearAlert()
			return
		}
		const currentUser = { email, password }
		loginUser(currentUser)
	}

	return (
		<div>
			<form className='form' onSubmit={handleSubmit}>
				<FormRow name='email' labelText='email' type='email' value={values.email} handleChange={handleChange} />
				<FormRow name='password' labelText='password' password='email' value={values.password} handleChange={handleChange} />
				<button type='submit' className='btn'>login</button>
			</form>
		</div>
	);
};

export default LoginForm;