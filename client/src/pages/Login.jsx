import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRow from "../components/FormRow.jsx";

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
	const { user, loginUser, logoutUser } = useGlobalContext()

	const [showAlert, setShowAlert] = useState(false)
	const [adminLoggedIn, setAdminLoggedIn] = useState(false)

	const alert = 'Logged in'

	// set state values as user types
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	// authenticate (for now) that admin is trying to log in, then send to loginUser function
	const handleSubmit = (e) => {
		e.preventDefault()
		const {email, password} = values
		if (email !== 'admin@mail.com' || password !== 'password') {
			console.log('error');
			return
		}
		setShowAlert(true)

		const currentUser = { email, password }
		loginUser(currentUser)
		toast.success('User Logged in')
	}

	// automatically redirect to home if user credentials ok
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
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

			{adminLoggedIn ?

				<button type='submit' className='btn' onClick={logout}>logout</button>

				:

				<form className='form' onSubmit={handleSubmit}>
					{showAlert && alert}
					<FormRow name='email' labelText='email' type='email' value={values.email} handleChange={handleChange} />
					<FormRow name='password' labelText='password' password='email' value={values.password}
					         handleChange={handleChange} />
					<button type='submit' className='btn'>login</button>
					<p>Not a member yet? <a href='/register'>Register</a></p>
				</form>

			}
		</div>
	);
};

export default Login;