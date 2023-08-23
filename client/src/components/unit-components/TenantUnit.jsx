import { useEffect, useState } from "react";
import TenantUpdateForm from "../forms/TenantUpdateForm.jsx";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { TenantAssistanceForm } from "../forms/index.js";

const TenantUnit = () => {

	const [showTenantUpdateForm, setShowTenantUpdateForm] = useState(false)
	const [showTenantAssistanceForm, setShowTenantAssistanceForm] = useState(false)

	const { tenant, role } = useGlobalContext()

	return (
	<div className="tenant">

		<div className="text-3xl text-center mb-4 font-bold">Tenant Details</div>

		<div className="flex flex-col gap-1 text-center my-4">
			<div className="font-medium">{tenant.lastName}, {tenant.firstName}</div>
			<div className="text-lg">{tenant.phone}</div>
			<div className="text-lg">{tenant.email}</div>
		</div>

		<div className="font-bold text-center text-xl">Balance: {tenant.balance || '-'}</div>


		{
			tenant.isAssisted &&
			<div className="my-8 text-center">
				<div className="font-semibold">Agency Information</div>
				<div className="flex flex-col m-4 gap-2 text-lg">
					<div>Agency: {tenant.rentAssistance?.agent?.agency || ''}</div>
					<div>Agent: {tenant.rentAssistance?.agent?.name || ''}</div>
					<div>phone: {tenant.rentAssistance?.agent?.phone || ''}</div>
					<div>email: {tenant.rentAssistance?.agent?.email || ''}</div>

					<div>
						<div className="font-semibold text-xl">Tenant Rent Portion:</div>
						<div>{tenant.rentAssistance?.tenantPortion || ''}</div>
					</div>

					<div className="">
						<div className="font-semibold text-xl">Assisted Rent Payment:</div>
						<div>{tenant.rentAssistance?.assistedPortion || ''}</div>
					</div>
				</div>
			</div>
		}
		{
			role === 'admin' &&

			<div className="flex gap-4 justify-center my-8">
				<button
					className='btn'
					onClick={() => setShowTenantUpdateForm(true)}>
					edit tenant
				</button>

				<button
					className='btn'
					onClick={() => setShowTenantAssistanceForm(true)}>
					edit assistance
				</button>

				{showTenantUpdateForm && <TenantUpdateForm setShowTenantUpdateForm={setShowTenantUpdateForm} />}
				{showTenantAssistanceForm &&
					<TenantAssistanceForm setShowTenantAssistanceForm={setShowTenantAssistanceForm} />}
			</div>
		}


	</div>
	);
};

export default TenantUnit;