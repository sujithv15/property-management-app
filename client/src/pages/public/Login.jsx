import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRow from "../../components/forms/FormRow.jsx";
import {Navigate} from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm.jsx";

const initialState = {
	name: '',
	email: '',
	password: '',
}

const Login = () => {

	// new state values for user input values
	const [values, setValues] = useState(initialState)

	// function in our GlobalContext to login user to server
	const { user, isLoading, showAlert, displayAlert, clearAlert, loginUser, logoutUser } = useGlobalContext()

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
	// send to server to set back to initial state
	const logout = () => {
		logoutUser()
	}

	return (
		<div>
			<h2>Login</h2>

			{user ?

				<>
					<h5>Welcome {user.name || user.email} </h5>
					<button type='submit' className='btn' onClick={logout}>logout</button>
				</>
				:

				<LoginForm />
			}
		</div>
	);
};

export default Login;