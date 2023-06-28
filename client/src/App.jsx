import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Layout, Login, Register } from "./pages";
import {AdminHome, Rents, Research, Payments, Maintenance} from "./pages/admin";
import Home from "./pages/Home.jsx";

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />}/>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>

				<Route path="/admin" element={<Layout />}>
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
