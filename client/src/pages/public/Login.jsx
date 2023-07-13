import { useGlobalContext } from "../../context/GlobalContext.jsx";
import LoginForm from "../../components/forms/LoginForm.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/index.js";
import { config } from '../../../constants.js'

const Login = () => {

	const { user, role, showAlert } = useGlobalContext()

	// automatically redirect appropriately if user credentials ok
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate(`/${role}`);
			}, 1000);
		}
		console.log(config.url.API_URL);
	}, [user]);


	return (
		<div className='border-solid border-4 rounded-3xl w-11/12 my-20 mx-auto py-14 max-w-md'>
			{user ?
				<>
					<div className="text-center m-5 text-2xl">Welcome {user.name || user.email} </div>
					{showAlert && <Alert />}
				</>
				:
				<LoginForm />
			}
		</div>
	);
};

export default Login;