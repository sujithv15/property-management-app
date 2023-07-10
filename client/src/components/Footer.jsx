import {useGlobalContext} from "../context/GlobalContext.jsx";

const Footer = () => {

	const { user, properties, logoutUser, role } = useGlobalContext()



	return (
		<div className="footer">
			<p>&copy; Sujith Varughese 2023</p>

			<button onClick={()=>console.log(user)}>print user</button>
			<button onClick={()=>console.log(role)}>print role state</button>
			<button onClick={()=>console.log(properties)}>print properties</button>
			<button onClick={logoutUser}>logout</button>
		</div>
	);
};

export default Footer;