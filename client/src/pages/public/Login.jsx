import { useGlobalContext } from "../../context/GlobalContext.jsx";
import LoginForm from "../../components/forms/LoginForm.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {

	const { user, role } = useGlobalContext()

	// automatically redirect appropriately if user credentials ok
	const navigate = useNavigate()
	useEffect(() => {
		if (user && Object.keys(user).length > 0) {
			console.log(`navigating to ${role}`);
			setTimeout(() => {
				navigate(`/${role}`);
			}, 1000);
		}
		//console.log(config.url.API_URL);
	}, [user]);

			//<div className='border-solid border-4 rounded-3xl w-11/12 my-20 mx-auto py-14 max-w-md'>
	return (
		<div className="sm:py-24">
			<LoginForm />
		</div>



	);
};

export default Login;