import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRow from "./FormRow.jsx";
import ModalWrapper from "./ModalWrapper.jsx";

const TenantUpdateForm = ({ tenant, setShowTenantUpdateForm }) => {

	const [values, setValues] = useState(tenant)

	const { updateTenant } = useGlobalContext()

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
		updateTenant(tenant._id, values)
		toast.success('TenantUnit Successfully Updated')
	}

	return (
		<ModalWrapper>
			<div className="modal">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Edit Tenant Details</div>
						<div className="form-content grid-cols-6">
							<FormRow
								labelText="lastName" type="text" name="lastName"
								value={values.lastName} handleChange={handleChange}
								style="col-span-3"
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
								style="col-span-2"
							/>
							<FormRow
								labelText="balance" type="number" name="balance"
								value={values.balance} handleChange={handleChange}
								style="col-span-2"
							/>
							<FormRow
								labelText="isAssisted" type="boolean" name="isAssisted"
								value={values.isAssisted} handleChange={handleChange}
								style="col-span-1"
							/>
						</div>


						{
							tenant.isAssisted &&

							<div className="assistance-info">
								<FormRow
									labelText="rentAssistance" type="number" name="rentAssistance"
									value={values.rentAssistance?.tenantPortion} handleChange={handleChange}
									style="col-span-1"
								/>

								<FormRow
									labelText="assistedPortion" type="number" name="assistedPortion"
									value={values.rentAssistance?.assistedPortion} handleChange={handleChange}
									style="col-span-1"
								/>

								<div className="assisted-agency-info">
									<FormRow
										labelText="agentName" type="text" name="agentName"
										value={values.rentAssistance?.agent?.name} handleChange={handleChange}
										style="col-span-1"
									/>
									<FormRow
										labelText="agency" type="text" name="agency"
										value={values.rentAssistance?.agent?.agency} handleChange={handleChange}
										style="col-span-1"
									/>
									<FormRow
										labelText="agentPhone" type="text" name="agentPhone"
										value={values.rentAssistance?.agent?.phone} handleChange={handleChange}
										style="col-span-1"
									/>
									<FormRow
										labelText="agentEmail" type="email" name="agentEmail"
										value={values.rentAssistance?.agent?.email} handleChange={handleChange}
										style="col-span-1"
									/>
								</div>
							</div>
						}

					<div className="flex justify-around pt-10">
						<button type="submit" className='btn'>update tenant</button>
						<button className="btn" onClick={() => setShowTenantUpdateForm(false)}>Cancel</button>
					</div>

				</form>
			</div>
		</ModalWrapper>
	)
};

export default TenantUpdateForm;