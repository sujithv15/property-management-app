import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Landing, Error } from "./pages/public";
import { Rents, Research, Payments, Maintenance, Tenants, Register, AdminDashboard } from "./pages/admin";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Layout from "./pages/Layout.jsx";


const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="landing" element={<Landing />} />
				<Route path="login" element={<Login />} />

				<Route path="user/dashboard" element={<UserDashboard />} />

				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					<Route index element={<AdminDashboard />}/>
					<Route path="register" element={<Register />} />
					<Route path="payments" element={<Payments />} />
					<Route path="maintenance" element={<Maintenance />} />
					<Route path="rents" element={<Rents />} />
					<Route path="research" element={<Research />} />
					<Route path="tenants" element={<Tenants />} />
				</Route>


				<Route path='*' element={<Error />} />

			</Routes>
		</BrowserRouter>
	);
};

export default App;
