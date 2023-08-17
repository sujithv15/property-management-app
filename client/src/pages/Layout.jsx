import { Footer, Navbar, Loading } from "../components/index.js";
import { linksUser } from "./user/links-user.js";
import { linksPublic } from "./public/links-public.js";
import { linksAdmin } from "./admin/links-admin.js";
import { Outlet, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";


const Layout = () => {

	const { user, role, readUnits, isLoading } = useGlobalContext()

	const [navLinks, setNavLinks] = useState(linksPublic)

	/* Whenever role changes, the nav bar will update to the appropriate links and pass the links to Navbar as props */
	const navigate = useNavigate()
	useEffect(() => {
		if (role === 'admin') {
			setNavLinks(linksAdmin)
		}
		else if (role === 'user') {
			setNavLinks(linksUser)
		}
		else setNavLinks(linksPublic)

		if (user && Object.keys(user).length > 0) {
			console.log(`navigating to ${role}`);
			setTimeout(() => {
				navigate(`/${role}`);
			}, 1000);
		}
		//console.log(config.url.API_URL);
	}, [role])

	// public outlet = <Landing />
	// user outlet = <UserDashboard />
	// admin outlet = <AdminDashboard />
	return (
		<div className="max-w-6xl mx-auto lg:px-24 md:px-12 sm:px-8 px-4">

			<div className="">
				<Navbar links={navLinks}/>
			</div>

			{ isLoading && <Loading /> }

			<div className="">
				<Outlet />
			</div>

			<div className="">
				<Footer />
			</div>

		</div>
	);
};

export default Layout;