import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import { Alert } from "../../components/index.js";
import FormRow from "../../components/forms/FormRow.jsx";
import { NavLink } from "react-router-dom";


const initialState = {
	name: '',
	email: '',
	password: '',
}

const Register = () => {

	const [values, setValues] = useState(initialState)

	// function in our GlobalContext to login user to server
	const { registerUser, alert } = useGlobalContext()

	// set state values as user types
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	// values to GlobalContext registerUser function to send to server
	const handleSubmit = (e) => {
		e.preventDefault()
		const { name, email, password } = values
		if (!name || !email || !password) {
			toast.error('Enter all values!')
			return
		}
		const currentUser = {name, email, password}
		registerUser(currentUser)
		toast.success('User Successfully Registered')
	}

	return (
		<div className="page">
			<h2>Register</h2>
			<form className='form' onSubmit={handleSubmit}>
				{alert.showAlert && <Alert/>}
				<FormRow name='name' labelText='name' type='text' value={values.name} handleChange={handleChange}/>
				<FormRow name='email' labelText='email' type='email' value={values.email} handleChange={handleChange}/>
				<FormRow name='password' labelText='password' password='email' value={values.password} handleChange={handleChange}/>
				<button type='submit' className='btn'>register</button>
				<p>Already a member?  <NavLink to="/login">Login</NavLink></p>
			</form>
		</div>
	);
};

export default Register;