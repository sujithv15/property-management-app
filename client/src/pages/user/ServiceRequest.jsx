import { useState} from "react";
import { toast } from "react-toastify";
import FormRow from "../../components/forms/FormRow.jsx";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useNavigate } from "react-router-dom";

const initialState = {
	title: '',
	description: ''
}

const ServiceRequest = () => {

	const { createServiceRequest, unit } = useGlobalContext()

	const [values, setValues] = useState(initialState)

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const navigate = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault()
		const { title, description } = values
		console.log(title);
		console.log(description);
		if (!title || !description) {
			toast('Enter a valid title and description')
			return
		}
		createServiceRequest({ title, description, unit })
		toast.success('Thank You, Your Request has been sent. Please allow 24-48 hours for processing')
		setTimeout(() => {
			navigate('/');
		}, 3000);
	}

	return (
		<div>

			<form className="form" onSubmit={handleSubmit}>
				<div className="form-content max-w-xl mx-auto">
					<div className="form-title">Make a Service Request</div>
					<FormRow
						labelText="Title" type="text" name="title"
						value={values.title} handleChange={handleChange}
						style=""
					/>
					<label className="form-label">Description
						<textarea placeholder="Description" name="description" value={values.description} onChange={handleChange} className="form-textarea"/>
					</label>
				</div>
				<div className="flex justify-around pt-10">
					<button type="submit" className='btn'>submit</button>
				</div>

			</form>

		</div>
	);
};

export default ServiceRequest;