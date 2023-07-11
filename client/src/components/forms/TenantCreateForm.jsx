import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";

const initialState = {
	unit: null,
	lastName: '',
	firstName: '',
	email: '',
	phone: '',
	balance: 0,
	isAssisted: false,
	rentAssistance: {
		tenantPortion: 0,
		assistedPortion: 0,
		agent: {
			name: '',
			agency: '',
			phone: '',
			email: ''
		}
	}
}

const TenantCreateForm = (tenant, id) => {

	const [values, setValues] = useState(initialState)

	const { unit, lastName, firstName, email, phone, balance, isAssisted, rentAssistance } = tenant

	const { displayAlert, clearAlert, createTenant } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		values._id = id
		const { lastName, firstName } = values
		if ( !lastName || !firstName) {
			toast.error('Enter all values')
			return
		}
		createTenant({...values, unit: id})
		toast.success('Tenant Successfully Created')
	}

	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<FormRow labelText="lastName" type="text" name="lastName" value={values.lastName} handleChange={handleChange}/>
				<FormRow labelText="firstName" type="text" name="firstName" value={values.firstName} handleChange={handleChange}/>
				<FormRow labelText="email" type="email" name="email" value={values.email} handleChange={handleChange}/>
				<FormRow labelText="phone" type="text" name="phone" value={values.phone} handleChange={handleChange}/>
				<FormRow labelText="rent" type="number" name="rent" value={values.rent} handleChange={handleChange}/>
				<FormRow labelText="balance" type="number" name="balance" value={values.balance} handleChange={handleChange}/>
				<FormRow labelText="isAssisted" type="text" name="isAssisted" value={values.isAssisted} handleChange={handleChange}/>
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
				<button type="submit" className='btn'>create tenant</button>
			</form>
		</div>
	);
};

export default TenantCreateForm;