import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const Navbar = ({ user, links }) => {

	const { logoutUser } = useGlobalContext()

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<nav>
			<div className="navbar">
					{
						links.map((links, index) => {
							return (
								<div key={index}>
								<NavLink to={links.url} className="nav-link">{links.name}</NavLink>
								</div>
							)
						})
					}
				{
					user &&
					<button type="submit" className="btn" onClick={logoutUser}>logout</button>
				}
			</div>

		</nav>
	);
};

export default Navbar;