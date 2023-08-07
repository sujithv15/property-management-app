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
			<div className="modal">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Edit Tenant Assistance Details</div>
					<div className="form-content grid grid-cols-2">

						<div className="flex flex-col w-3/8 mx-auto m-8 gap-4">
							<FormRow
								labelText="Tenant Rent Portion" type="number" name="tenantPortion"
								value={values.tenantPortion} handleChange={handleChange}
								style="col-span-1"
							/>

							<FormRow
								labelText="Housing Assisted Payment" type="number" name="assistedPortion"
								value={values.assistedPortion} handleChange={handleChange}
								style="col-span-1"
							/>
						</div>

						<div className="flex flex-col w-5/6 mx-auto ml-4 gap-4">
							<div className="font-bold text-xl">Housing Agency Information</div>
							<FormRow
								labelText="Agent" type="text" name="name"
								value={agentValues.name} handleChange={handleChange}
								style="col-span-1"
							/>
							<FormRow
								labelText="Agency" type="text" name="agency"
								value={agentValues.agency} handleChange={handleChange}
								style="col-span-1"
							/>
							<FormRow
								labelText="Phone" type="text" name="phone"
								value={agentValues.phone} handleChange={handleChange}
								style="col-span-1"
							/>
							<FormRow
								labelText="Email" type="email" name="email"
								value={agentValues.email} handleChange={handleChange}
								style="col-span-1"
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