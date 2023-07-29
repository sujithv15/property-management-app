import { ApplianceUpdateForm } from "./forms/index.js";

import { useState } from "react";

const Appliance = ( {appliance }) => {

	const [showForm, setShowForm] = useState(false)

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
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={() => setShowForm(true)}>
					edit appliance
				</button>
				{showForm &&
					<ApplianceUpdateForm
						appliance={appliance}
						setShowForm={setShowForm}
					/>
				}
			</div>

		</div>
	);
};

export default Appliance;