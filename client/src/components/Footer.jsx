import {useGlobalContext} from "../context/GlobalContext.jsx";

const Footer = () => {

	const { user, properties } = useGlobalContext()

	return (
		<div className="footer">
			<p>&copy; Sujith Varughese 2023</p>

			<button onClick={()=>console.log(user)}>log user</button>
			<button onClick={()=>console.log(properties)}>log properties</button>

		</div>
	);
};

export default Footer;