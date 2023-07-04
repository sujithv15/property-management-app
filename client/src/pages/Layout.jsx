import { Navbar, Footer } from "../components/index.js";
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