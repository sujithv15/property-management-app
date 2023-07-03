import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";

const initialState = {
	property: '',
	unit: '',
	lastName: '',
	firstName: '',
}

const TenantForm = () => {

	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, isLoading, createTenant, readTenants, tenants, properties, units } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { unit, lastName, firstName } = values
		if (!unit || !lastName || !firstName) {
			displayAlert()
			clearAlert()
			return
		}

		const tenant = { unit, lastName, firstName }
		createTenant(tenant)
		toast.success('Tenant Successfully Created')
	}

	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<FormRow labelText="property" type="text" name="name" value={values.property} handleChange={handleChange}/>
				<FormRow labelText="street" type="text" name="street" value={values.street} handleChange={handleChange}/>
				<FormRow labelText="city" type="text" name="city" value={values.city} handleChange={handleChange}/>
				<FormRow labelText="state" type="text" name="state" value={values.state} handleChange={handleChange}/>
				<FormRow labelText="zip" type="text" name="zip" value={values.zip} handleChange={handleChange}/>
				<FormRow labelText="number of units" type="text" name="numUnits" value={values.numUnits} handleChange={handleChange}/>
				<FormRow labelText="unit types" type="text" name="unitTypes" value={values.unitTypes} handleChange={handleChange}/>

				<button type="submit" className='btn'>create property</button>
			</form>
		</div>
	);
};

export default TenantForm;