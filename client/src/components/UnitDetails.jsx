import TenantForm from "./forms/TenantForm.jsx";
import ApplianceForm from "./forms/ApplianceForm.jsx";
import { useState } from "react";
import UnitUpdateForm from "./forms/UnitUpdateForm.jsx";

const UnitDetails = (unit) => {

	const { _id, address, isPrimary, tenant, user, bedrooms, bathrooms, rent, fmrRent, appliances, repairs, insurance, mortgage, association, taxes, maintenance } = unit

	const [showUnitForm, setShowUnitForm] = useState(false)
	const [showTenantForm, setShowTenantForm] = useState(false)
	const [showApplianceForm, setShowApplianceForm] = useState(false)

	return (
		<div className="unit-details">
			<div className="unit-details-rent unit-details-item">
				Rent: ${rent}
				Fair Market Value rent: ${fmrRent}
			</div>

			<div className="unit-update unit-item">
				{unit ?
					<button className="btn" onClick={() => setShowUnitForm(!showUnitForm)}>edit unit</button>
					:
					<button className="btn" onClick={() => setShowUnitForm(!showUnitForm)}>add unit</button>
				}
			</div>

			<div className="unit-details-appliances unit-details-item">
				Appliances
			</div>
			<div className="unit-details-repairs unit-details-item">
				Repairs
			</div>

			<div className="unit-add-tenant unit-item">
				{tenant ?
					<button className="btn" onClick={() => setShowTenantForm(!showTenantForm)}>edit tenant</button>
					:
					<button className="btn" onClick={() => setShowTenantForm(!showTenantForm)}>add tenant</button>
				}
			</div>

			<div className="unit-appliances unit-item">
				<button className="btn" onClick={() => setShowApplianceForm(!showApplianceForm)}>view/edit appliances</button>
			</div>

			<div className="add-tenant-form">
				{showUnitForm && <UnitUpdateForm unitEdit={unit}/>}
			</div>

			<div className="add-tenant-form">
				{showTenantForm && <TenantForm unit={address.street}/>}
			</div>

			<div className="add-appliance-form">
				{showApplianceForm && <ApplianceForm unit={address.street}/>}
			</div>



			<div className="unit-details-tenant">

			</div>

		</div>
	);
};

export default UnitDetails;