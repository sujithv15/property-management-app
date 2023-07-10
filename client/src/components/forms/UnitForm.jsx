import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";

const initialState = {
	street: '',
	bedrooms: '',
	bathrooms: '',
	tenant: '',
	rent: '',
	fmrRent: '',
}

const UnitForm = (_id) => {

	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, isLoading, createUnit, readUnits, units, properties } = useGlobalContext()


	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { street, bedrooms, bathrooms, tenant, rent, fmrRent } = values
		if (!street) {
			displayAlert()
			clearAlert()
			return
		}
		const unit = { street, bedrooms, bathrooms, tenant, rent, fmrRent }
		unit.property = _id
		createUnit(unit)
		toast.success('Unit Successfully Created')
	}


	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<FormRow labelText="street" type="text" name="street" value={values.address.street} handleChange={handleChange}/>
				<FormRow labelText="bedrooms" type="number" name="bedrooms" value={values.bedrooms} handleChange={handleChange}/>
				<FormRow labelText="bathrooms" type="number" name="bathrooms" value={values.bathrooms} handleChange={handleChange}/>
				<FormRow labelText="tenant" type="text" name="tenant" value={values.tenant} handleChange={handleChange}/>
				<FormRow labelText="rent" type="number" name="rent" value={values.rent} handleChange={handleChange}/>
				<FormRow labelText="fmrRent" type="number" name="fmrRent" value={values.fmrRent} handleChange={handleChange}/>
				<button type="submit" className='btn'>create property</button>
			</form>
		</div>
	);
};


export default UnitForm;