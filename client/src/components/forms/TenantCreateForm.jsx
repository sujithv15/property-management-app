import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRow from "./FormRow.jsx";
import ModalWrapper from "./ModalWrapper.jsx";

const initialState = {
	unit: {} ,
	lastName: '',
	firstName: '',
	email: '',
	phone: '',
	rent: 0,
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

const TenantCreateForm = ({ setShowCreateTenantForm, unit_id }) => {

	const [values, setValues] = useState(initialState)

	const { createTenant } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { lastName, firstName } = values
		if ( !lastName || !firstName) {
			toast.error('Enter all values')
			return
		}
		createTenant({ ...values, unit: unit_id }, unit_id)
		toast.success('TenantUnit Successfully Created')
		setShowCreateTenantForm(false)
	}

	return (
		<ModalWrapper>
			<div className='modal'>

				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Create Tenant</div>
					<div className="form-content grid-cols-6">
						<FormRow
							labelText="lastName" type="text" name="lastName"
							value={values.lastName} handleChange={handleChange}
							style="col-span-2"
						/>
						<FormRow
							labelText="firstName" type="text" name="firstName"
							value={values.firstName} handleChange={handleChange}
							style="col-span-2"
						/>
						<FormRow
							labelText="email" type="email" name="email"
							value={values.email} handleChange={handleChange}
							style="col-span-3"
						/>
						<FormRow
							labelText="phone" type="text" name="phone"
							value={values.phone} handleChange={handleChange}
							style="col-span-2"
						/>
						<FormRow
							labelText="rent" type="number" name="rent"
							value={values.rent} handleChange={handleChange}
							style="col-span-1"
						/>
						<FormRow
							labelText="balance" type="number" name="balance"
							value={values.balance} handleChange={handleChange}
							style="col-span-1"
						/>
						<FormRow
							labelText="isAssisted" type="boolean" name="isAssisted"
							value={values.isAssisted} handleChange={handleChange}
							style="col-span-1"
						/>
					</div>

					<div className="flex justify-around pt-10">
						<button type="submit" className='btn'>create tenant</button>
						<button className="btn" onClick={() => setShowCreateTenantForm(false)}>cancel</button>
					</div>

				</form>
			</div>
		</ModalWrapper>
	);
};

export default TenantCreateForm;