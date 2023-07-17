import FormRow from "./FormRow.jsx";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";

const initialState = {
	name: '',
	email: '',
	password: '',
}

const LoginForm = () => {
	// new state values for user input values
	const [values, setValues] = useState(initialState)

	// function in our GlobalContext to login user to server
	const { loginUser } = useGlobalContext()

	// set state values as user types
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	// loginUser function calls api with post request to validate login info
	// context will set state.user and isAdmin appropriately
	const handleSubmit = (e) => {
		e.preventDefault()
		const { email, password } = values
		if (!email || !password) {
			toast('Enter valid email and password!')
			return
		}
		loginUser({ email, password })
	}

	return (
		<div className="">
			<form className='' onSubmit={handleSubmit}>

				<div className="text-center">
					<h2 className="text-center m-10 text-2xl">Login</h2>
				</div>

				<div className="m-10 space-y-10">
					<FormRow name='email' labelText='email' type='email' value={values.email} handleChange={handleChange} />
					<FormRow type="search" name='password' labelText='password' password='email'  value={values.password} handleChange={handleChange} />
					<button type='submit'  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs">login</button>
				</div>

			</form>
		</div>
	);
};

export default LoginForm;