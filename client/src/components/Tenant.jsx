import { useState } from "react";
import TenantUpdateForm from "./forms/TenantUpdateForm.jsx";

const Tenant = (tenant) => {

	const [showTenantUpdateForm, setShowTenantUpdateForm] = useState(false)

	return (

		<div className="tenant">

			<div>
				Rent: {tenant.rent || ''}
			</div>
			<div>
				Balance: {tenant.balance || ''}
			</div>
			<div>
				Assisted housing: {tenant.isAssisted || ''}
			</div>
			{
				tenant.isAssisted &&
				<>
					<div>
						Tenant portion: {tenant.rentAssistance.tenantPortion || ''}
					</div>
					<div>
						Assisted portion: {tenant.rentAssistance.assistedPortion || ''}
					</div>
					<div>
						Housing information
						Agent: {tenant.rentAssistance.agent.name || ''}
						Agency: {tenant.rentAssistance.agency.agency || ''}
						phone: {tenant.rentAssistance.agent.phone || ''}
						email: {tenant.rentAssistance.agent.email || ''}
					</div>

				</>
			}

			<div className="edit-tenant">
				<button
					className="edit-tenant btn"
					onClick={() => setShowTenantUpdateForm(!showTenantUpdateForm)
					}>
					{showTenantUpdateForm ? "cancel" : "edit tenant"}
				</button>
			</div>

			{showTenantUpdateForm && <TenantUpdateForm {...tenant}/>}

		</div>
	);
};

export default Tenant;