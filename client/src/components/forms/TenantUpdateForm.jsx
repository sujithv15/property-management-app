import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRow from "./FormRow.jsx";

const TenantUpdateForm = (tenant) => {

	const { _id, unit, user, lastName, firstName, email, phone, rent, balance, isAssisted, rentAssistance } = tenant

	const [values, setValues] = useState(tenant)

	const { displayAlert, clearAlert } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { lastName, firstName } = values
		if (!lastName || !firstName) {
			toast.error('Enter all values')
			return
		}
		// updateTenant()
		toast.success('Tenant Successfully Updated')
	}

	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<FormRow labelText="unit" type="text" name="unit" value={unit} readOnly={true}/>
				<FormRow labelText="lastName" type="text" name="lastName" value={values.lastName} handleChange={handleChange}/>
				<FormRow labelText="firstName" type="text" name="firstName" value={values.firstName} handleChange={handleChange}/>
				<FormRow labelText="email" type="email" name="email" value={values.email} handleChange={handleChange}/>
				<FormRow labelText="phone" type="text" name="phone" value={values.phone} handleChange={handleChange}/>
				<FormRow labelText="rent" type="number" name="rent" value={values.rent} handleChange={handleChange}/>
				<FormRow labelText="balance" type="number" name="balance" value={values.balance} handleChange={handleChange}/>
				<FormRow labelText="isAssisted" type="boolean" name="isAssisted" value={values.isAssisted} handleChange={handleChange}/>

				<div className="tenant-form-assisted">
					<FormRow labelText="rentAssistance" type="number" name="rentAssistance" value={values.rentAssistance} handleChange={handleChange}/>
					<FormRow labelText="assistedPortion" type="number" name="assistedPortion" value={values.assistedPortion} handleChange={handleChange}/>

					<div className="tenant-form-assisted">
						<FormRow labelText="agentName" type="text" name="agentName" value={values.agent?.name} handleChange={handleChange}/>
						<FormRow labelText="agency" type="text" name="agency" value={values.agent?.agency} handleChange={handleChange}/>
						<FormRow labelText="agentPhone" type="text" name="agentPhone" value={values.agent?.phone} handleChange={handleChange}/>
						<FormRow labelText="agentEmail" type="email" name="agentEmail" value={values.agent?.email} handleChange={handleChange}/>
					</div>
				</div>

				<button type="submit" className='btn'>update tenant</button>
			</form>
		</div>
	);
};

export default TenantUpdateForm;