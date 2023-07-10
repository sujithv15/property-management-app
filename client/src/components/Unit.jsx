import { PrimaryUnitDetails, Tenant, UnitDetails } from "./index.js";
import {useState} from "react";
import TenantForm from "./forms/TenantForm.jsx";
import ApplianceForm from "./forms/ApplianceForm.jsx";


const Unit = (unit) => {

	const { _id, propertyUnit, street, city, state, zip, isPrimary, tenant, user, bedrooms, bathrooms, rent, fmrRent, appliances, repairs, insurance, mortgage, association, taxes, maintenance } = unit

	const [showUnitDetails, setShowUnitDetails] = useState(false)
	const [showTenantDetails, setShowTenantDetails] = useState(false)
	const [showTenantForm, setShowTenantForm] = useState(false)
	const [showApplianceForm, setShowApplianceForm] = useState(false)

	return (
		<div className="unit-container">
			<div className="unit-info">

				<div className="unit-street unit-item">
					<a onClick={
						()=>setShowUnitDetails(!showUnitDetails)}
					   style={{cursor: 'pointer'}}
					>
						{isPrimary && <>*</>}
						{propertyUnit} {street} {city} {state} {zip}
					</a>
						{
							showUnitDetails &&
							<div className="unit-unit-info">
								<h4>{rent}</h4>
							</div>
						}
				</div>

				<div className="unit-type unit-item">
					<p>{bedrooms}br/ {bathrooms}ba</p>
				</div>

				<div className="unit-tenant unit-item">
					<a onClick={()=>setShowTenantDetails(!showTenantDetails)} style={{cursor: 'pointer'}}>{tenant? <>{`${tenant.lastName}, ${tenant.firstName}`}</> : <></> }</a>
					<div className="unit-tenant-info">
						{showTenantDetails && <>{tenant.phone}{tenant.email}</>}
					</div>
				</div>

				<div className="unit-rent unit-item">
					<p>{rent}</p>
				</div>

				{isPrimary && <PrimaryUnitDetails {...unit} />}

			</div>



			{showUnitDetails &&

				<div className="unit-details-container">
					<UnitDetails {...unit} />
				</div>
			}


		</div>
	);
};

export default Unit;