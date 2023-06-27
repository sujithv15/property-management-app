import {useState} from "react";
import FormRow from "../components/FormRow.jsx";

const initialState = {
	name: '',
	email: '',
	password: '',
	isLoggedIn: false,
}

// fake admin values used for developing

const Login = () => {

	const [values, setValues] = useState(initialState)
	const [showAlert, setShowAlert] = useState(false)
	const [adminLoggedIn, setAdminLoggedIn] = useState(false)

	const alert = 'Logged in'

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const {email, password} = values
		if (values.email !== 'admin@mail.com' || values.password !== 'password') {
			console.log('error');
			return
		}
		setShowAlert(true)
		setAdminLoggedIn(true)
	}

	const logout = () => {
		setAdminLoggedIn(false)
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