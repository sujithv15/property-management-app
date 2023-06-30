import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Loading } from "../components"

const ProtectedRoute = ({ children }) => {
	const { user, userLoading } = useGlobalContext()

	if (userLoading) return <Loading />

	if (!user) {
		return <Navigate to='/landing' />
	}
	if (!user.isAdmin) {
		return <Navigate to='/user/dashboard' />
	}


	return children
}

export default ProtectedRoute