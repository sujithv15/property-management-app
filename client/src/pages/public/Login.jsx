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


	// function in our GlobalContext to login user to server
	const { user, logoutUser } = useGlobalContext()

	// send to server to set back to initial state
	const logout = () => {
		logoutUser()
	}

	return (
		<div>

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