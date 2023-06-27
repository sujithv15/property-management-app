import { Navbar, Footer } from "../components";
import {Outlet} from "react-router-dom";
import {useState} from "react";


const Layout = () => {


	return (
		<div className="layout">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;