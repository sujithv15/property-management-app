import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Layout, Login, Register } from "./pages";
import {AdminHome, Rents, Research, Payments, Maintenance, AdminLogin} from "./pages/admin";
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
					<Route path="login_admin" element={<AdminLogin />} />
				</Route>

				<Route path="/admin" element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}>
					<Route index element={<AdminHome />}/>
					<Route path="payments" element={<Payments />} />
					<Route path="maintenance" element={<Maintenance />} />
					<Route path="rents" element={<Rents />} />
					<Route path="research" element={<Research />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
