import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRow from "./FormRow.jsx";

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

const TenantCreateForm = ({setShowCreateTenantForm, tenant}) => {

	const [values, setValues] = useState(initialState)

	const { unit, lastName, firstName, email, phone, balance, isAssisted, rentAssistance } = tenant

	const { id, displayAlert, clearAlert, createTenant } = useGlobalContext()

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
		<div className='border-solid border-4 rounded-3xl my-20 px-20 py-10 mx-auto max-w-2xl'>

			<div className="text-center">
				<h2 className="text-center m-10 text-2xl">Add new Tenant</h2>
			</div>

			<form className="form form m-10 space-y-10" onSubmit={handleSubmit}>
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
				<div className="flex justify-around">
					<button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs'>create tenant</button>

					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowCreateTenantForm(false)}>cancel</button>
				</div>

			</form>
		</div>
	);
};

export default TenantCreateForm;