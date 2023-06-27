import {useGlobalContext} from "../context/GlobalContext.jsx";


const Alert = () => {

	const { alertType, alertText } = useGlobalContext()

	return (
		<div className={`alert alert-${alertType}`}>
			{alertText}
		</div>
	)
}

export default Alert