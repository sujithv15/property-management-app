import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const Navbar = ({ links }) => {

	const { user, logoutUser } = useGlobalContext()

	return (
		<nav>
			<div className="flex justify-around py-5 font-serif bg-stone-100">
				{
					links.map((links, index) => {
						return (
							<div key={index}>
							<NavLink to={links.url} className="cursor-pointer hover:pink focus:bg-yellow">{links.name}</NavLink>
							</div>
						)
					})
				}

				{
					user && Object.keys(user).length > 0 &&
					<button type="submit" className="btn" onClick={logoutUser}>Logout</button>
				}
			</div>

		</nav>
	);
};

export default Navbar;