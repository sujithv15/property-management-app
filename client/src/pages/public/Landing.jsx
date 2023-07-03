import Login from "./Login.jsx";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const Landing = () => {

	const { user } = useGlobalContext()

	// automatically redirect to home if user credentials ok
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 1000);
		}
	}, [user, navigate]);

	return (
		<div>
			<h2>Landing Page</h2>
			<button onClick={()=>console.log(user)}>button</button>
			{ !user && <Login/> }

		</div>
	);
};

export default Landing;