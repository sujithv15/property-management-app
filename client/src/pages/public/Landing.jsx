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
			<h2>Property Management Assistant</h2>
			<h4>The only one-stop solution to seamlessly manage all your properties in one place</h4>
			<h5>Easily communicate with tenants</h5>
			<h5>Manage maintenance and service requests</h5>
			<h5>Collect rent, and automatically generate rent receipts</h5>
			<h5>Stay on top of payments</h5>

			{ !user && <Login/> }

		</div>
	);
};

export default Landing;