import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { LoginNavbar, NavbarModal }from "./";
import { HiMenu } from "react-icons/hi"

import { MdHomeWork } from "react-icons/md"
import { useEffect, useState } from "react";

const Navbar = ({ links }) => {

	const { user, logoutUser, role } = useGlobalContext()

	const handleLogout =  () => {
		logoutUser()
	}

	const [showNavModal, setShowNavModal] = useState(false)


	return (
		<nav className="flex justify-between py-1 font-serif items-center mx-1 border-b-4 md:py-5 md:mx-4">

			{
				role === 'admin' && <NavLink to="/admin" className=""><MdHomeWork size={36}/></NavLink>
			}
			{
				role === 'user' && <NavLink to="/user" className=""><MdHomeWork size={36}/></NavLink>
			}
			{
				role === 'public' && <NavLink to="/" className=""><MdHomeWork size={36}/></NavLink>
			}

			{
				Object.keys(user).length === 0 &&
				<div className="main-title text-sm sm:text-lg">Property Management Solutions</div>
			}

			{
				links.map((links, index) => {
					return (

							<NavLink key={index} className="hidden text-sm sm:text-lg sm:flex" to={links.url}>{links.name}</NavLink>

					)
				})
			}

			{
				(user && Object.keys(user).length > 0) ?
					<>
						<button type="submit" className="btn invisible sm:visible" onClick={handleLogout}>Logout</button>

						<div className="visible sm:hidden">
							<HiMenu className="hover:cursor-pointer" onClick={()=>setShowNavModal(!showNavModal)} />
								{ showNavModal &&
									<NavbarModal
										setShowNavModal={setShowNavModal}
										links={links}
									/>
								}

						</div>

					</>


					:
				<>
					<LoginNavbar />
					<NavLink to="/login" className="btn sm:hidden">Log In</NavLink>
				</>
			}

		</nav>
	);
};

export default Navbar;