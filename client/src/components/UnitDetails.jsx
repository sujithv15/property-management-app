import TenantCreateForm from "./forms/TenantCreateForm.jsx";
import ApplianceForm from "./forms/ApplianceForm.jsx";
import { useState } from "react";
import UnitUpdateForm from "./forms/UnitUpdateForm.jsx";

const UnitDetails = (unit) => {

	const { _id, propertyUnit, street, city, state, zip, isPrimary, tenant, user, bedrooms, bathrooms, rent, fmrRent, appliances, repairs, insurance, mortgage, association, taxes, maintenance } = unit

	const [showUnitForm, setShowUnitForm] = useState(false)
	const [showTenantForm, setShowTenantForm] = useState(false)
	const [showAppliances, setShowAppliances] = useState(false)

	return (
		<div className="unit-details-container">

			<div className="unit-details-rent">
				<p>Rent: ${rent}</p>
				<p>Fair Market Value rent: ${fmrRent}</p>
			</div>

			<div className="unit-details-appliances">
				<a onClick={
					()=>setShowAppliances(!showAppliances)}
				   style={{cursor: 'pointer'}}
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

			<div className="unit-details-repairs">
				Repairs
			</div>

			{
				isPrimary &&

				<div className="primary-unit-details">
					<div className="unit-insurance">
						Insurance: {insurance?.company} {insurance?.premium} {insurance?.details}
					</div>

					<div className="unit-mortgage">
						mortgage
					</div>

					<div className="unit-taxes">
						taxes
					</div>

					<div className="unit-association">
						association
					</div>

					<div className="unit-maintenance">
						association
					</div>
				</div>
			}

			<div className="unit-update-btn">
				<button
					className="btn"
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