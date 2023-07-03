import { Navbar, Footer } from "../components";
import { Outlet } from "react-router-dom";


const Layout = () => {


	return (
		<main>
			<Navbar />
			<Outlet />
			<Footer />
		</main>
	);
};

export default Layout;