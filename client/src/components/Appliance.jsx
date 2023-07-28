import ApplianceCreateForm from "./forms/ApplianceCreateForm.jsx";

import { useState } from "react";

const Appliance = ( {appliance }) => {

	const [showApplianceUpdateForm, setShowApplianceUpdateForm] = useState(false)

	console.log(appliance);

	return (
		<div className="appliance">
			<div>
				Appliance: {appliance.appliance}
			</div>
			<div>
				Date purchased: {appliance.datePurchased}
			</div>
			<div>
				Warranty: {appliance.warranty}
			</div>
			<div>
				Receipt: {appliance.receipt}
			</div>


			<div className="unit-appliances unit-item">
				<button
					className="btn"
					onClick={() => setShowApplianceUpdateForm(true)}>
					edit appliance
				</button>
			</div>

		</div>
	);
};

export default Appliance;