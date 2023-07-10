import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";

const initialState = {
	property: '',
	lastName: '',
	firstName: '',
}

const TenantForm = ({ property, unit }) => {

	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, createTenant } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { unit, lastName, firstName } = values
		if (!unit || !lastName || !firstName) {
			toast.error('Enter all values')
			return
		}
		const tenant = { unit, lastName, firstName }
		createTenant(tenant)
		toast.success('Tenant Successfully Created')
	}

	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<FormRow labelText="property" name="property" value={property}/>
				<FormRow labelText="unit" type="text" name="unit" value={unit} readOnly={true}/>
				<FormRow labelText="lastName" type="text" name="lastName" value={values.lastName} handleChange={handleChange}/>
				<FormRow labelText="firstName" type="text" name="firstName" value={values.firstName} handleChange={handleChange}/>
				<FormRow labelText="email" type="email" name="email" value={values.email} handleChange={handleChange}/>
				<FormRow labelText="phone" type="text" name="phone" value={values.phone} handleChange={handleChange}/>
				<FormRow labelText="rent" type="number" name="rent" value={values.rent} handleChange={handleChange}/>
				<FormRow labelText="balance" type="number" name="balance" value={values.balance} handleChange={handleChange}/>
				<FormRow labelText="isAssisted" type="text" name="isAssisted" value={values.isAssisted} handleChange={handleChange}/>
				<FormRow labelText="rentAssistance" type="number" name="rentAssistance" value={values.rentAssistance} handleChange={handleChange}/>
				<FormRow labelText="assistedPortion" type="number" name="assistedPortion" value={values.assistedPortion} handleChange={handleChange}/>

				<div>
					<FormRow labelText="agentName" type="text" name="agentName" value={values.agent?.name} handleChange={handleChange}/>
					<FormRow labelText="agency" type="text" name="agency" value={values.agent?.agency} handleChange={handleChange}/>
					<FormRow labelText="agentPhone" type="text" name="agentPhone" value={values.agent?.phone} handleChange={handleChange}/>
					<FormRow labelText="agentEmail" type="email" name="agentEmail" value={values.agent?.email} handleChange={handleChange}/>
				</div>

				<button type="submit" className='btn'>create property</button>
			</form>
		</div>
	);
};

export default TenantForm;