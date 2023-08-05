import { Footer, Navbar, Loading } from "../components/index.js";
import { linksUser } from "./user/links-user.js";
import { linksPublic } from "./public/links-public.js";
import { linksAdmin } from "./admin/links-admin.js";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";


const Layout = () => {

	const { role, readUnits, isLoading } = useGlobalContext()

	const [navLinks, setNavLinks] = useState(linksPublic)

	/* Whenever role changes, the nav bar will update to the appropriate links and pass the links to Navbar as props */
	useEffect(() => {
		if (role === 'admin') {

			setNavLinks(linksAdmin)
			return
		}
		if (role === 'user') {
			setNavLinks(linksUser)
			return
		}
		setNavLinks(linksPublic)
	}, [role])

	// public outlet = <Landing />
	// user outlet = <UserDashboard />
	// admin outlet = <AdminDashboard />
	return (
		<div className="max-w-5xl mx-auto">
			<div className="border-solid border-4 rounded-md">
				<Navbar links={navLinks}/>
			</div>
			{ isLoading && <Loading /> }
			<div className="border-solid border-4 rounded-md px-20 py-10">
				<Outlet />
			</div>
			<div className="border-solid border-4 rounded-md">
				<Footer />
			</div>

		</div>
	);
};

export default Layout;