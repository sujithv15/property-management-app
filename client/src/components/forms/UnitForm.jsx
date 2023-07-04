import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";

const initialState = {
	property: '',
	address: '',
	status: '',
	tenant: '',
	rent: '',
	fmrRent: '',
}

const UnitForm = () => {

	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, isLoading, createUnit, readUnits, units, properties } = useGlobalContext()

	const propertiesList = properties.map(property => property.propertyID)


	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { property, address, status } = values
		if (!property || !address || !status) {
			displayAlert()
			clearAlert()
			return
		}

		const unit = { property, address, status }
		createUnit(unit)
		toast.success('Unit Successfully Created')
	}


	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<FormRowSelect labelText="property" name="property" value={values.property} handleChange={handleChange} list={propertiesList}/>
				<FormRow labelText="street line 1" type="text" name="street" value={values.address.street} handleChange={handleChange}/>
				<FormRow labelText="street line 2" type="text" name="streetOptions" value={values.address.streetOptions} handleChange={handleChange}/>
				<FormRow labelText="city" type="text" name="city" value={values.address.city} handleChange={handleChange}/>
				<FormRow labelText="state" type="text" name="state" value={values.address.state} handleChange={handleChange}/>
				<FormRow labelText="zip" type="text" name="zip" value={values.address.zip} handleChange={handleChange}/>
				<FormRow labelText="bedrooms" type="number" name="bedrooms" value={values.bedrooms} handleChange={handleChange}/>
				<FormRow labelText="bathrooms" type="number" name="bathrooms" value={values.bathrooms} handleChange={handleChange}/>
				<FormRow labelText="tenant" type="text" name="tenant" value={values.tenant} handleChange={handleChange}/>
				<FormRow labelText="rent" type="text" name="rent" value={values.tenant} handleChange={handleChange}/>
				<FormRow labelText="fmrRent" type="number" name="fmrRent" value={values.tenant} handleChange={handleChange}/>
				<button type="submit" className='btn'>create property</button>
			</form>
		</div>
	);
};


export default UnitForm;