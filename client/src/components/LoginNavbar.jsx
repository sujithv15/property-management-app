import FormRow from "./forms/FormRow.jsx";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import GuestLogin from "./GuestLogin.jsx";
import { useNavigate } from "react-router-dom";

const initialState = {
	email: '',
	password: '',
}

const LoginNavbar = () => {

	// new state values for user input values
	const [values, setValues] = useState(initialState)

	// function in our GlobalContext to login user to server
	const { loginUser, isLoading } = useGlobalContext()

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
		<div className="login-nav hidden truncate sm:block">
			<form className="flex gap-2" onSubmit={handleSubmit}>

				<div className="flex flex-col gap-2 mb-1">
					<input name="email" type="email" value={values.email} onChange={handleChange} placeholder="Email" className="form-input h-6" />

					<input name="password" type="password" value={values.password} onChange={handleChange} placeholder="Password" className="form-input h-6"/>
				</div>

				<button className="btn mt-6">Login</button>
			</form>

		<div className="grid grid-cols-2">
			<GuestLogin />
		</div>

		</div>
	);
};

export default LoginNavbar;