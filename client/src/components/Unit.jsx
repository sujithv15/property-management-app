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
		<div className="unit-container">
			<div className="unit-info">

				<div className="unit-street">
					<a onClick={
						()=>setShowUnitDetails(!showUnitDetails)}
					   style={{cursor: 'pointer'}}
					>
						{isPrimary && <>*</>}
						{propertyUnit} {street} {city} {state} {zip}
					</a>
				</div>

				<div className="unit-type">
					<p>{bedrooms}br/ {bathrooms}ba</p>
				</div>

				<div className="unit-rent">
					<p>{rent}</p>
				</div>

				<div className="unit-tenant">
					{
						tenant ?
							<div className="unit-tenant-info">
								<div className="unit-tenant-name">
										<a onClick={
											()=>setShowTenantDetails(!showTenantDetails)}
										   style={{cursor: 'pointer'}}
										>
											tenant.lastName, tenant.firstName
										</a>
								</div>
								<div className="unit-tenant-contact">
									<p>{tenant.phone}</p>
									<p>{tenant.email}</p>
								</div>
							</div>
							:
							<button
								className="btn"
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