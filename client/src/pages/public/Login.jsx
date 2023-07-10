import { useGlobalContext } from "../../context/GlobalContext.jsx";
import LoginForm from "../../components/forms/LoginForm.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/index.js";

const Login = () => {

	const { user, role, showAlert } = useGlobalContext()

	// automatically redirect appropriately if user credentials ok
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate(`/${role}`);
			}, 2000);
		}
	}, [user]);


	return (
		<div>
			{user ?
				<>
					<h5>Welcome {user.name || user.email} </h5>
					{showAlert && <Alert />}
				</>
				:
				<LoginForm />
			}
		</div>
	);
};

export default Login;