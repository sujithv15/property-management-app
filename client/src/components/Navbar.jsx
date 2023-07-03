import {NavLink} from "react-router-dom";
import { adminLinks } from "../pages/admin/adminLinks.js";
import { links } from "../pages/user/links.js";

// validate if admin, user, or none is logged in. Display navbar links accordingly

const Navbar = () => {


	return (
		<nav>
			<div className="navbar">
					{
						adminLinks.map((adminLink, index) => {
						return (
							<div key={index}>
							<NavLink to={adminLink.url} className="nav-link">{adminLink.name}</NavLink>
							</div>
						)
					})}

			</div>

		</nav>
	);
};

export default Navbar;