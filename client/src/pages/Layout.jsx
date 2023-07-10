import { Footer, Navbar } from "../components/index.js";
import { linksUser } from "./user/links-user.js";
import { linksPublic } from "./public/links-public.js";
import { linksAdmin } from "./admin/links-admin.js";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import { toast} from "react-toastify";

const Layout = () => {

	const { role } = useGlobalContext()

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
		<div>
			<Navbar links={navLinks}/>
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;