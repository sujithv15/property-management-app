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

	const { createTenant, registerUser } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { lastName, firstName, email } = values
		if ( !lastName || !firstName || !email) {
			toast.error('Enter all values')
			return
		}
		const newUser = {
			lastName: lastName,
			firstName: firstName,
			email: email,
			password: "temp-password",
			unit: unit_id
		}
		// pass unit_id so createTenant can run getUnitDetails, which updates unit and tenant global states
		createTenant({ ...values, unit: unit_id }, newUser)
		registerUser(newUser)
		toast.success('TenantUnit Created')
		setShowCreateTenantForm(false)
	}

	return (
		<ModalWrapper>
			<div className='modal max-w-sm'>

				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Create Tenant</div>
					<div className="form-content grid-cols-3">
						<FormRow
							labelText="Last Name" type="text" name="lastName"
							value={values.lastName} handleChange={handleChange}
							style="col-span-3"
						/>
						<FormRow
							labelText="First Name" type="text" name="firstName"
							value={values.firstName} handleChange={handleChange}
							style="col-span-3"
						/>
						<FormRow
							labelText="Email" type="email" name="email"
							value={values.email} handleChange={handleChange}
							style="col-span-3"
						/>
						<FormRow
							labelText="Phone" type="text" name="phone"
							value={values.phone} handleChange={handleChange}
							style="col-span-3"
						/>
						<FormRow
							labelText="Rent" type="number" name="rent"
							value={values.rent} handleChange={handleChange}
							style="col-span-1"
						/>
						<FormRow
							labelText="Balance" type="number" name="balance"
							value={values.balance} handleChange={handleChange}
							style="col-span-1"
						/>
						<div className="col-span-1">
							<label htmlFor="isAssisted" className="form-label">Assistance</label>
							<select
								name="isAssisted"
								value={values.isAssisted}
								onChange={handleChange}
								className="form-select"
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</div>
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