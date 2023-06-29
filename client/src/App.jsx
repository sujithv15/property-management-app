import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Layout, Login } from "./pages";
import {AdminHome, Rents, Research, Payments, Maintenance, Tenants, Register} from "./pages/admin";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />}/>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="payments" element={<Payments />} />
					<Route path="maintenance" element={<Maintenance />} />
					<Route path="rents" element={<Rents />} />
					<Route path="research" element={<Research />} />
					<Route path="tenants" element={<Tenants />} />

				</Route>



			</Routes>
		</BrowserRouter>
	);
};

export default App;
