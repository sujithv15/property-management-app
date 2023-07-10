import {useGlobalContext} from "../context/GlobalContext.jsx";
import { toast } from "react-toastify";

const Alert = () => {

	const { alertType, alertText } = useGlobalContext()

	return (
		<div className={`alert alert-${alertType}`}>
			{toast(alertText)}
		</div>
	)
}

export default Alert