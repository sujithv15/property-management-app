import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";

const UnitUpdateForm = (unit) => {

	const { _id, propertyUnit, street, city, state, zip, isPrimary, tenant, user, bedrooms, bathrooms, rent, fmrRent, appliances, repairs, insurance, mortgage, association, taxes, maintenance } = unit

	const [values, setValues] = useState(unit)

	const { displayAlert, clearAlert } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { propertyUnit } = values
		if (!propertyUnit) {
			displayAlert()
			clearAlert()
			return
		}
		// updateUnit()
		toast.success('UnitDetails Successfully Created')
	}


	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>

				<FormRow labelText="unit" type="text" name="unit" value={values.unit} handleChange={handleChange}/>
				<FormRow labelText="street" type="text" name="street" value={values.street} handleChange={handleChange}/>
				<FormRow labelText="city" type="text" name="city" value={values.city} handleChange={handleChange}/>
				<FormRow labelText="state" type="text" name="state" value={values.state} handleChange={handleChange}/>
				<FormRow labelText="zip" type="text" name="zip" value={values.zip} handleChange={handleChange}/>
				<FormRow labelText="isPrimary" type="text" name="isPrimary" value={values.isPrimary} handleChange={handleChange}/>
				<FormRow labelText="bedrooms" type="number" name="bedrooms" value={values.bedrooms} handleChange={handleChange}/>
				<FormRow labelText="bathrooms" type="number" name="bathrooms" value={values.bathrooms} handleChange={handleChange}/>
				<FormRow labelText="rent" type="number" name="rent" value={values.rent} handleChange={handleChange}/>
				<FormRow labelText="fmrRent" type="number" name="fmrRent" value={values.fmrRent} handleChange={handleChange}/>

				{
					isPrimary &&
					<div className="form-primary">
						<div className="unit-form-insurance">
							<FormRow labelText="company" type="text" name="company" value={values.insurance.company} handleChange={handleChange}/>
							<FormRow labelText="premium" type="number" name="premium" value={values.insurance.premium} handleChange={handleChange}/>
							<FormRow labelText="details" type="text" name="details" value={values.insurance.details} handleChange={handleChange}/>
						</div>
						<div className="unit-form-mortgage">
							<FormRow labelText="mortgage" type="text" name="mortgage" value={values.mortgage} handleChange={handleChange}/>
						</div>
						<div className="unit-form-tax">
							<FormRow labelText="tax" type="text" name="tax" value={values.taxes} handleChange={handleChange}/>
						</div>
						<div className="unit-form-maintenance">
							<FormRow labelText="maintenance" type="text" name="maintenance" value={values.maintenance} handleChange={handleChange}/>
						</div>
					</div>
				}

				<button type="submit" className='btn'>create property</button>
			</form>
		</div>
	);
};


export default UnitUpdateForm;