import {useGlobalContext} from "../context/GlobalContext.jsx";

const Footer = () => {

	const { user, units, logoutUser, role } = useGlobalContext()



	return (
		<div className="m-10 text-xs">
			<p>&copy; Sujith Varughese 2023</p>

			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={()=>console.log(user)}>print user</button>
			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={()=>console.log(role)}>print role state</button>
			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={()=>console.log(units)}>print units</button>
			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={logoutUser}>logout</button>
		</div>
	);
};

export default Footer;