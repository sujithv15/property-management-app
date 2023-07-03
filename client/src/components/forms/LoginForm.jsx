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

	// authenticateUser (for now) that admin is trying to log in, then send to loginUser function
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
				{showAlert && <Alert/>}
				<FormRow name='email' labelText='email' type='email' value={values.email} handleChange={handleChange} />
				<FormRow name='password' labelText='password' password='email' value={values.password}
				         handleChange={handleChange} />
				<button type='submit' className='btn'>login</button>
			</form>
		</div>
	);
};

export default LoginForm;