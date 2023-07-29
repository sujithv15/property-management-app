import {useGlobalContext} from "../context/GlobalContext.jsx";

const Footer = () => {

	const { user, units, logoutUser, role, unit, tenant, appliances } = useGlobalContext()



	return (
		<div className="m-10 text-xs">
			<p>&copy; Sujith Varughese 2023</p>
			<div>For testing: </div>
			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={()=>console.log(user)}>print user</button>

			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={()=>console.log(role)}>print role state</button>

			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={()=>console.log(units)}>print units</button>

			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={()=>console.log(unit)}>print unit</button>

			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={()=>console.log(tenant)}>print tenant</button>

			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={()=>console.log(appliances)}>print appliances</button>

			<button className="bg-blue-500 hover:bg-blue-700 m-2 text-white py-1 px-1 rounded text-xs" onClick={logoutUser}>logout</button>
		</div>
	);
};

export default Footer;