import { useState } from "react";
import TenantUpdateForm from "../forms/TenantUpdateForm.jsx";

const TenantUnit = (tenant) => {

	const [showTenantUpdateForm, setShowTenantUpdateForm] = useState(false)

	return (

		<div className="tenant">

			<p>Tenant: </p>
			<p>{tenant?.firstName} {tenant?.lastName}</p>

			<div className="tenant-contact">
				<p>{tenant?.phone}</p>
				<p>{tenant?.email}</p>
			</div>

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
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs'
					onClick={() => setShowTenantUpdateForm(!showTenantUpdateForm)}>
					edit tenant
				</button>
				{showTenantUpdateForm && <TenantUpdateForm tenant={tenant} setShowTenantUpdateForm={setShowTenantUpdateForm}/>}
			</div>

		</div>
	);
};

export default TenantUnit;