import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Landing, Error, About } from "./pages/public";
import { Research, Accounting, Units, Maintenance, Register, AdminDashboard, MessagesAdmin, ServiceRequests, Tenants } from "./pages/admin";
import { UserDashboard, ServiceRequest, MessagesUser } from "./pages/user";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Layout from "./pages/Layout.jsx";
import Unit from "./pages/admin/Unit.jsx";

const App = () => {

	return (
		<BrowserRouter>
			<Routes>

				<Route path="/" element={<Layout />}>
					<Route index element={<Landing />} />
					<Route path="about" element={<About />} />
					<Route path="login" element={<Login />} />
				</Route>


				<Route path="/user" element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					<Route index element={<UserDashboard />} />
					<Route path="request" element={<ServiceRequest />} />
					<Route path="messages" element={<MessagesUser />} />
				</Route>


				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					<Route index element={<AdminDashboard />}/>
					<Route path="units" element={<Units />} />
					<Route path="units/:id" element={<Unit />}/>
					<Route path="register" element={<Register />} />
					<Route path="accounting" element={<Accounting />} />
					<Route path="tenants" element={<Tenants />} />
					<Route path="maintenance" element={<Maintenance />} />
					<Route path="requests" element={<ServiceRequests />} />
					<Route path="research" element={<Research />} />
					<Route path="messages" element={<MessagesAdmin />} />
				</Route>


				<Route path='*' element={<Error />} />

			</Routes>
		</BrowserRouter>
	);
};

export default App;
