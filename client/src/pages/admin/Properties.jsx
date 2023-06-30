import {FormRow} from "../../components/index.jsx";
import {useState} from "react";
import {toast} from "react-toastify";
import {useGlobalContext} from "../../context/GlobalContext";

const initialState = {
	name: '',
	street: '',
	city: '',
	state: '',
	zip: '',
	numUnits: '',
	unitTypes: '',
}

const Properties = () => {

	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, createProperty } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { name, street, city, state, zip, numUnits, unitTypes } = values
		if (!name || !street || !city || !state || !zip || !numUnits || !unitTypes) {
			displayAlert()
			clearAlert()
			return
		}

		const property = { name, street, city, state, zip, numUnits, unitTypes }
		createProperty(property)
		toast.success('Property Successfully Created')
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<FormRow labelText="name" type="text" name="name" value={values.name} handleChange={handleChange}/>
				<FormRow labelText="street" type="text" name="street" value={values.street} handleChange={handleChange}/>
				<FormRow labelText="city" type="text" name="city" value={values.city} handleChange={handleChange}/>
				<FormRow labelText="state" type="text" name="state" value={values.state} handleChange={handleChange}/>
				<FormRow labelText="zip" type="text" name="zip" value={values.zip} handleChange={handleChange}/>
				<FormRow labelText="number of units" type="text" name="numUnits" value={values.numUnits} handleChange={handleChange}/>
				<FormRow labelText="unit types" type="text" name="unitTypes" value={values.unitTypes} handleChange={handleChange}/>

				<button type="submit">create property</button>
			</form>
		</div>
	);
};

export default Properties;