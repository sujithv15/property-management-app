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

			<form className='border-solid border-4 rounded-3xl w-11/12 my-20 mx-auto max-w-sm' onSubmit={handleSubmit}>

				<div className="text-center">
					<h2 className="text-center m-10 text-2xl">Login</h2>
				</div>

				<div className="m-20 space-y-10">
					<FormRow name='email' labelText='email' type='email' value={values.email} handleChange={handleChange} />
					<FormRow type="search" name='password' labelText='password' password='email'  value={values.password} handleChange={handleChange} />
					<button type='submit'  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs">login</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;