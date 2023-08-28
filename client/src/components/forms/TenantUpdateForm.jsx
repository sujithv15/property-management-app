import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRow from "./FormRow.jsx";
import ModalWrapper from "./ModalWrapper.jsx";


const TenantUpdateForm = ({ setShowTenantUpdateForm }) => {

	const { tenant, updateTenant, registerUser } = useGlobalContext()
	const [values, setValues] = useState(tenant)
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value })
	}

	const createUser = (e) => {
		e.preventDefault()
		const newUser = {
			lastName: tenant.lastName,
			firstName: tenant.firstName,
			email: tenant.email,
			password: "temp-password",
			unit: tenant.unit,
			tenant: tenant._id
		}
		console.log(newUser);
		registerUser(newUser)
		toast.success('User Created')
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { lastName, firstName } = values
		if (!lastName || !firstName) {
			toast.error('Enter all values')
			return
		}
		updateTenant(tenant._id, values)
		toast.success('Tenant Updated')
		setShowTenantUpdateForm(false)
	}


	return (
		<ModalWrapper>
			<div className="modal max-w-lg">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Edit Tenant Details</div>
						<div className="form-content grid-cols-6">
							<FormRow
								labelText="lastName" type="text" name="lastName"
								value={values.lastName} handleChange={handleChange}
								style="col-span-6"
							/>
							<FormRow
								labelText="firstName" type="text" name="firstName"
								value={values.firstName} handleChange={handleChange}
								style="col-span-6"
							/>
							<FormRow
								labelText="email" type="email" name="email"
								value={values.email} handleChange={handleChange}
								style="col-span-3"
							/>
							<FormRow
								labelText="phone" type="text" name="phone"
								value={values.phone} handleChange={handleChange}
								style="col-span-3"
							/>
							<FormRow
								labelText="rent" type="number" name="rent"
								value={values.rent} handleChange={handleChange}
								style="col-span-3"
							/>
							<FormRow
								labelText="balance" type="number" name="balance"
								value={values.balance} handleChange={handleChange}
								style="col-span-3"
							/>
							<div className="col-span-2 col-start-2">
								<label htmlFor="isAssisted" className="form-label">Rent Assistance</label>
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
						<button type="submit" className='btn'>update tenant</button>
						<button className="btn" onClick={() => setShowTenantUpdateForm(false)}>Cancel</button>
						<div>
							{
								!tenant.user
								&&
								<button className="btn" onClick={createUser}>Create user</button>
							}


						</div>
					</div>

				</form>
			</div>
		</ModalWrapper>
	)
};

export default TenantUpdateForm;