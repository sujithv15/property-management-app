import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import { FormRow, Alert } from "../../components";

const initialState = {
	name: '',
	id: '',
	password: '',
	isLoggedIn: false,
}

const Login = () => {

	// new state values for user input values
	const [values, setValues] = useState(initialState)

	// function in our GlobalContext to login user to server
	const { admin, user, isLoading, showAlert, displayAlert, clearAlert, loginAdmin, logoutAdmin } = useGlobalContext()

	// set state values as user types
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	// authenticate (for now) that admin is trying to log in, then send to loginUser function
	const handleSubmit = (e) => {
		e.preventDefault()
		const {name, id, password} = values
		if (!name || !password || !id) {
			displayAlert()
			clearAlert()
			console.log('Invalid credentials');
			return
		}
		const currentAdmin = { name, id, password }
		loginAdmin(currentAdmin)
		toast.success('Admin Logged in')
	}

	// automatically redirect to home if user credentials ok
	const navigate = useNavigate()
	useEffect(() => {
		if (admin) {
			console.log(admin);
			setTimeout(() => {
				navigate('/admin',)
			}, 1000)
		}
	}, [admin, navigate])

	// send to server to set back to initial state
	const logout = () => {
		logoutAdmin()
	}

	return (
		<div>
			<h2>Admin Login</h2>

			{admin ?

				<>
					<h5>Welcome {values.name} </h5>
					<button type='submit' className='btn' onClick={logout}>logout</button>
				</>

				:

				<form className='form' onSubmit={handleSubmit}>
					{showAlert && <Alert/>}
					<FormRow name='name' labelText='name' type='text' value={values.name} handleChange={handleChange} />
					<FormRow name='id' labelText='id' type='text' value={values.id} handleChange={handleChange} />
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