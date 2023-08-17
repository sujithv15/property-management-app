import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import LoginNavbar from "./LoginNavbar.jsx";

import { MdHomeWork } from "react-icons/md"
import { useEffect } from "react";

const Navbar = ({ links }) => {

	const { user, logoutUser, role } = useGlobalContext()

	const navigate = useNavigate()
	const handleLogout =  () => {
		logoutUser()
		navigate('/')
	}

	return (
		<nav className="flex justify-between pt-5 font-serif items-center mx-4">


				<NavLink to="/" className=""><MdHomeWork size={36}/></NavLink>


				{
					Object.keys(user).length === 0 &&
					<div className="main-title text-sm sm:text-2xl">Property Management Solutions</div>
				}

				{
					links.map((links, index) => {
						return (
							<div key={index} className="text-sm sm:text-2xl">
								<NavLink to={links.url} className="">{links.name}</NavLink>
							</div>
						)
					})
				}


				{
					(user && Object.keys(user).length > 0) ?
					<button type="submit" className="btn" onClick={handleLogout}>Logout</button>
						:
<>
					<LoginNavbar />
					<NavLink to="/login" className="text-sm sm:hidden underline text-blue-500 hover:cursor-pointer hover:text-cyan-500">Log In</NavLink>
</>
				}

		</nav>
	);
};

export default Navbar;