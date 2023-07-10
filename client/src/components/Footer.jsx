import {useGlobalContext} from "../context/GlobalContext.jsx";

const Footer = () => {

	const { user, units, logoutUser, role } = useGlobalContext()



	return (
		<div className="footer">
			<p>&copy; Sujith Varughese 2023</p>

			<button onClick={()=>console.log(user)}>print user</button>
			<button onClick={()=>console.log(role)}>print role state</button>
			<button onClick={()=>console.log(units)}>print units</button>
			<button onClick={logoutUser}>logout</button>
		</div>
	);
};

export default Footer;