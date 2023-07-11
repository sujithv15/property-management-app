import { Tenant, UnitDetails } from "./index.js";
import {useState} from "react";
import TenantCreateForm from "./forms/TenantCreateForm.jsx";
import ApplianceForm from "./forms/ApplianceForm.jsx";


const Unit = (unit) => {

	const { _id, propertyUnit, street, city, state, zip, isPrimary, tenant, user, bedrooms, bathrooms, rent, fmrRent, appliances, repairs, insurance, mortgage, association, taxes, maintenance } = unit

	const [showUnitDetails, setShowUnitDetails] = useState(false)
	const [showTenantDetails, setShowTenantDetails] = useState(false)
	const [showCreateTenantForm, setShowCreateTenantForm] = useState(false)

	return (
		<div className="">
			<div className="grid grid-cols-5 mb-4 pt-3 justify-items-start border-t-2 ml-10">

				<div className="col-span-2">
					<a onClick={
						()=>setShowUnitDetails(!showUnitDetails)}
					>

						<p>
							<span className="absolute">{isPrimary && <>*</>}</span>
							<span className="pl-3"> {propertyUnit} {street}</span>
						</p>
						<p className="pl-3">{city}, {state} {zip}</p>
					</a>
				</div>

				<div className="unit-type">
					<p>{bedrooms}br/ {bathrooms}ba</p>
				</div>

				<div className="unit-rent">
					<p>${rent}</p>
				</div>

				<div className="unit-tenant">
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
			</div>

			{showUnitDetails &&
				<div>
					<UnitDetails {...unit} />
				</div>
			}
			{showCreateTenantForm &&
				<div>
					<TenantCreateForm {...tenant} id={_id}/>
				</div>
			}
		</div>
	);
};

export default Unit;