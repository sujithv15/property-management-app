import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Landing, Error, About } from "./pages/public";
import { Research, Accounting, Units, Maintenance, Register, AdminDashboard, Messages } from "./pages/admin";
import UserDashboard from "./pages/user/UserDashboard.jsx";
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
					<Route path="request" element={<Maintenance />} />
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
