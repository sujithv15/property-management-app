import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import { FormRow, Alert } from "../components";

const initialState = {
	name: '',
	email: '',
	password: '',
	isLoggedIn: false,
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

	// authenticate (for now) that admin is trying to log in, then send to loginUser function
	const handleSubmit = (e) => {
		e.preventDefault()
		const {email, password} = values
		if (!email || !password) {
			displayAlert()
			clearAlert()
			console.log('error');
			return
		}
		const currentUser = { email, password }
		loginUser(currentUser)
		toast.success('User Logged in')
	}

	// automatically redirect to home if user credentials ok
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			console.log(user);
			setTimeout(() => {
				navigate('/',)
			}, 1000)
		}
	}, [user, navigate])

	// send to server to set back to initial state
	const logout = () => {
		logoutUser()
	}

	return (
		<div>
			<h2>Login</h2>

			{values.isLoggedIn ?

				<>
					<h5>Welcome {values.name || values.email} </h5>
					<button type='submit' className='btn' onClick={logout}>logout</button>
				</>

				:

				<form className='form' onSubmit={handleSubmit}>
					{showAlert && <Alert/>}
					<FormRow name='email' labelText='email' type='email' value={values.email} handleChange={handleChange} />
					<FormRow name='password' labelText='password' password='email' value={values.password}
					         handleChange={handleChange} />
					<button type='submit' className='btn'>login</button>
					<p>Not a member yet? <NavLink to="/register">Register</NavLink></p>
				</form>
			}
		</div>
	);
};

export default Login;