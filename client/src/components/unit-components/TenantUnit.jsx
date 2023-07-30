import { useEffect, useState } from "react";
import TenantUpdateForm from "../forms/TenantUpdateForm.jsx";

const TenantUnit = (currentTenant) => {

	const [showTenantUpdateForm, setShowTenantUpdateForm] = useState(false)

	const [tenant, setTenant] = useState(currentTenant)

	useEffect(()=> {
		setTenant(currentTenant)
	}, [currentTenant])

	return (
	<div className="tenant">

		<div className="text-2xl text-center">Tenant Details</div>

		<div className=" grid grid-cols-5 justify-items-center pt-8 my-4" >
			<p className="text-xl font-bold">Last</p>
			<p className="text-xl font-bold">First</p>
			<p className="text-xl font-bold">Phone</p>
			<p className="text-xl font-bold">Email</p>
		</div>

		<div className="grid grid-cols-5 justify-items-center mb-16">
			<p>{tenant?.firstName}</p>
			<p>{tenant?.lastName}</p>
			<p>{tenant?.phone}</p>
			<p>{tenant?.email}</p>
			<div>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs'
					onClick={() => setShowTenantUpdateForm(!showTenantUpdateForm)}>
					edit tenant
				</button>
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
				<div>
					<div>
						Tenant portion: {tenant.rentAssistance?.tenantPortion || ''}
					</div>
					<div>
						Assisted portion: {tenant.rentAssistance?.assistedPortion || ''}
					</div>
					<div>
						Housing information
						Agent: {tenant.rentAssistance?.agent?.name || ''}
						Agency: {tenant.rentAssistance?.agency?.agency || ''}
						phone: {tenant.rentAssistance?.agent?.phone || ''}
						email: {tenant.rentAssistance?.agent?.email || ''}
					</div>

				</div>
			}

			<div className="edit-tenant">

				{showTenantUpdateForm && <TenantUpdateForm tenant={tenant} setShowTenantUpdateForm={setShowTenantUpdateForm}/>}
			</div>

		</div>
	</div>
	);
};

export default TenantUnit;