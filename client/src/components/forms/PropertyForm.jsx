import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";

const initialState = {
	propertyID: '',
	street: '',
	city: '',
	state: '',
	zip: '',
	units: ''
}
const PropertyForm = () => {

	const [values, setValues] = useState(initialState)

	const { displayAlert, clearAlert, createProperty, readUnits, readProperties, properties } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { propertyID, street, city, state, zip, units } = values
		if (!propertyID || !street || !city || !state || !zip) {
			displayAlert()
			clearAlert()
			return
		}

		const property = { propertyID, street, city, state, zip, units }
		createProperty(property)
		toast.success('Property Successfully Created')
	}

	return (
		<div>


			<form className="form" onSubmit={handleSubmit}>
				<FormRow labelText="property id" type="text" name="name" value={values.propertyID} handleChange={handleChange}/>
				<FormRow labelText="street" type="text" name="street" value={values.street} handleChange={handleChange}/>
				<FormRow labelText="city" type="text" name="city" value={values.city} handleChange={handleChange}/>
				<FormRow labelText="state" type="text" name="state" value={values.state} handleChange={handleChange}/>
				<FormRow labelText="zip" type="text" name="zip" value={values.zip} handleChange={handleChange}/>
				<FormRow labelText="units" type="text" name="numUnits" value={values.units} handleChange={handleChange}/>

				<button type="submit" className='btn'>create property</button>
			</form>
		</div>
	);
};

export default PropertyForm;