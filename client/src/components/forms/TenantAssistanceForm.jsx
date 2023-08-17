import FormRow from "./FormRow.jsx";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import ModalWrapper from "./ModalWrapper.jsx";
import { toast } from "react-toastify";

const TenantAssistanceForm = ({ setShowTenantAssistanceForm }) => {

	const { tenant, updateTenant } = useGlobalContext()

	const { rentAssistance } = tenant
	const { agent } = rentAssistance

	const [values, setValues] = useState(rentAssistance)
	const [agentValues, setAgentValues] = useState(agent)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
		setAgentValues({ ...agentValues, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		updateTenant(tenant._id, {...tenant, rentAssistance: { ...values, agent: agentValues }})
		toast.success("Tenant Successfully Updates")
		setShowTenantAssistanceForm(false)
	}

	return (
		<ModalWrapper>
			<div className="modal max-w-lg">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Edit Assistance</div>
					<div className="">

						<div className="flex flex-col mx-auto">
							<FormRow
								labelText="Agent" type="text" name="name"
								value={agentValues.name} handleChange={handleChange}
							/>
							<FormRow
								labelText="Agency" type="text" name="agency"
								value={agentValues.agency} handleChange={handleChange}
							/>
							<FormRow
								labelText="Phone" type="text" name="phone"
								value={agentValues.phone} handleChange={handleChange}
							/>
							<FormRow
								labelText="Email" type="email" name="email"
								value={agentValues.email} handleChange={handleChange}
							/>
						</div>

						<div className="flex mx-auto my-6 px-16 gap-8">
							<FormRow
								labelText="Tenant Rent Portion" type="number" name="tenantPortion"
								value={values.tenantPortion} handleChange={handleChange}
							/>
							<FormRow
								labelText="Housing Assisted Payment" type="number" name="assistedPortion"
								value={values.assistedPortion} handleChange={handleChange}
							/>
						</div>

					</div>

					<div className="flex justify-around pt-10">
						<button
							type="submit"
							className='btn'>
							Update Details
						</button>

						<button
							className="btn"
							onClick={() => setShowTenantAssistanceForm(false)}>
							Cancel
						</button>

					</div>
				</form>
			</div>
		</ModalWrapper>
	);
};

export default TenantAssistanceForm;