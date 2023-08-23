import { useState} from "react";
import { toast } from "react-toastify";

const ServiceRequest = () => {

	const [values, setValues] = useState([])

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { description } = values
		if (!description) {
			toast('Enter a valid unit')
			return
		}
		createServiceRequest(values)
		toast.success('UnitDetails Successfully Created')
	}

	return (
		<div>

		</div>
	);
};

export default ServiceRequest;