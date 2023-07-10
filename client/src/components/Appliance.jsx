import ApplianceForm from "./forms/ApplianceForm.jsx";
import { useState } from "react";

const Appliance = () => {

	const [unitAppliances, setUnitAppliances] = useState([])
	const [showApplianceForm, setShowApplianceForm] = useState(false)

	const getAppliances = () => {

	}

	return (
		<div>
			<div className="unit-appliances unit-item">
				<button className="btn" onClick={() => setShowApplianceForm(!showApplianceForm)}>view/edit appliances</button>
			</div>

			<div className="add-appliance-form">
				{showApplianceForm && <ApplianceForm unit={street}/>}
			</div>
		</div>
	);
};

export default Appliance;