
import {Navigate} from "react-router-dom";
import {useGlobalContext} from "../context/GlobalContext.jsx";


const ProtectedRoute = ({ children }) => {
	const { admin } = useGlobalContext()
	if (!admin) {
		return <Navigate to='/' />
	}

	return children

}

export default ProtectedRoute