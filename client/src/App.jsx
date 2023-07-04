import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Landing, Error } from "./pages/public";
import { Research, Finances, Properties, Maintenance, Register, AdminDashboard, Messages } from "./pages/admin";
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
					<Route path="properties" element={<Properties />} />
					<Route path="register" element={<Register />} />
					<Route path="finances" element={<Finances />} />
					<Route path="maintenance" element={<Maintenance />} />
					<Route path="research" element={<Research />} />
					<Route path="messages" element={<Messages />} />
				</Route>


				<Route path='*' element={<Error />} />

			</Routes>
		</BrowserRouter>
	);
};

export default App;
