import { useEffect, useState } from "react";
import TenantUpdateForm from "../forms/TenantUpdateForm.jsx";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { TenantAssistanceForm } from "../forms/index.js";

const TenantUnit = () => {

	const [showTenantUpdateForm, setShowTenantUpdateForm] = useState(false)
	const [showTenantAssistanceForm, setShowTenantAssistanceForm] = useState(false)

	const { tenant } = useGlobalContext()


	return (
	<div className="tenant">

		<div className="text-2xl text-center">Tenant Details</div>

		<div className="grid grid-cols-5 justify-items-center pt-8 my-4" >
			<div>{tenant.lastName}, {tenant.firstName}</div>
			<div>{tenant.phone}</div>
			<div>{tenant.email}</div>
			<div className="font-bold">Balance: {tenant.balance || ''}</div>

			<div>
				<button
					className='btn'
					onClick={() => setShowTenantUpdateForm(true)}>
					edit tenant
				</button>
				{showTenantUpdateForm && <TenantUpdateForm setShowTenantUpdateForm={setShowTenantUpdateForm}/>}
			</div>

		</div>

			{
				tenant.isAssisted &&
				<div className="grid grid-cols-5 pt-8 my-4">
					<div className="col-span-2">
						<div className="font-semibold">Agency Information</div>
						<div className="flex flex-col m-4 gap-2">
							<div>Agency: {tenant.rentAssistance?.agency?.agency || ''}</div>
							<div>Agent: {tenant.rentAssistance?.agent?.name || ''}</div>
							<div>phone: {tenant.rentAssistance?.agent?.phone || ''}</div>
							<div>email: {tenant.rentAssistance?.agent?.email || ''}</div>
						</div>
					</div>

					<div className="flex flex-col gap-8 col-span-2 m-6">
						<div>
							<div className="font-semibold">Tenant Rent Portion:</div>
							<div>{tenant.rentAssistance?.tenantPortion || ''}</div>
						</div>

						<div className="">
							<div className="font-semibold">Assisted Rent Payment: </div>
							<div>{tenant.rentAssistance?.assistedPortion || ''}</div>
						</div>
					</div>

					<div className="col-start-5 ml-6">
						<button
							className='btn h-12'
							onClick={() => setShowTenantAssistanceForm(true)}>
							edit assistance
						</button>
						{showTenantAssistanceForm && <TenantAssistanceForm setShowTenantAssistanceForm={setShowTenantAssistanceForm}/>}
					</div>
				</div>
			}

	</div>
	);
};

export default TenantUnit;