import TenantCreateForm from "./forms/TenantCreateForm.jsx";
import ApplianceCreateForm from "./forms/ApplianceCreateForm.jsx";
import { useEffect, useState } from "react";
import UnitUpdateForm from "./forms/UnitUpdateForm.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Tenant } from "./index.js";

const UnitDetails = (unit) => {

	const { getTenantDetails } = useGlobalContext()

	const { _id, propertyUnit, street, city, state, zip, isPrimary, tenant, user, bedrooms, bathrooms, rent, fmrRent, appliances, mortgage } = unit

	const [unitTenant, setUnitTenant] = useState('')
	const [showUnitForm, setShowUnitForm] = useState(false)
	const [showTenantDetails, setShowTenantDetails] = useState(false)
	const [showCreateTenantForm, setShowCreateTenantForm] = useState(false)
	const [showTenantForm, setShowTenantForm] = useState(false)
	const [showAppliances, setShowAppliances] = useState(false)


	useEffect(() => {
		setUnitTenant(getTenantDetails(tenant))
	}, [])

	return (
		<div className="grid grid-cols-5 mb-4 pt-3 justify-items-start ml-10">



			<div className="unit-tenant">
				<div>
					<p>Tenant: </p>
					<p>{unitTenant?.firstName} {unitTenant.lastName}</p>
					<p>{unitTenant?.phone}</p>
					<p>{unitTenant?.email}</p>
				</div>
				{
					tenant ?
						<div className="tenant-info">
							<div className="tenant-contact">
								<p>{tenant.phone}</p>
								<p>{tenant.email}</p>
							</div>
							<div className="tenant-details">
								<a onClick={
									()=>setShowTenantDetails(!showTenantDetails)}
								>
									<Tenant />
								</a>
							</div>
						</div>
						:
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
							onClick={() => setShowCreateTenantForm(!showCreateTenantForm)
							}>{showCreateTenantForm ? "cancel" : "add tenant"}
						</button>
				}
			</div>

			<div className="unit-details-rent">
				<p>Rent: ${rent}</p>
				<p>Market rent: ${fmrRent}</p>
			</div>

			<div className="unit-details-appliances">
				<a onClick={
					()=>setShowAppliances(!showAppliances)}
				>
					Appliances
				</a>
				{
					showAppliances &&
					<>
						<p>Refrigerator:</p>
						<p>Stove:</p>
						<p>Microwave:</p>
						<p>Washer</p>
						<p>Dryer</p>
						<p>HVAC</p>
						<p>Water heater</p>
					</>
				}
			</div>

			{
				isPrimary &&

				<div className="primary-unit-details">
					<div className="unit-mortgage">
						mortgage
					</div>
				</div>
			}

			<div className="unit-update-btn">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={() => setShowUnitForm(!showUnitForm)
				}>
					{showUnitForm ? "cancel" : "edit unit"}
				</button>
			</div>

			{tenant &&
				<button
					className="edit-tenant btn"
					onClick={() => setShowTenantForm(!showTenantForm)
				}>
					{showTenantForm ? "cancel" : "edit tenant"}
				</button>
			}

			<div className="unit-form">
				{showUnitForm && <UnitUpdateForm {...unit}/>}
			</div>
			<div className="tenant-form">
				{showTenantForm && <TenantUpdateForm {...unit}/>}
			</div>





		</div>
	);
};

export default UnitDetails;