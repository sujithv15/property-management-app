import { ApplianceUpdateForm } from "./forms/index.js";

import { useState } from "react";

const Appliance = ( {appliance }) => {

	const [showForm, setShowForm] = useState(false)

	return (
		<div className="appliance">

			<div className="grid grid-cols-5 justify-items-left my-4">
				<p className="text-xl font-bold">Appliance</p>
				<p className="text-xl font-bold">Date purchased</p>
				<p className="text-xl font-bold">Warranty</p>
				<p className="text-xl font-bold">Receipt</p>
			</div>

			<div className="grid grid-cols-5 justify-items-left">
				<p>{appliance.appliance}</p>
				<p>{appliance.datePurchased.substring(0, 10)}</p>
				<p>{appliance.warranty || "-"}</p>
				<p>{appliance.receipt || "-"}</p>
				<div className="">
					<button
						className="btn"
						onClick={() => setShowForm(true)}>
						edit appliance
					</button>
				</div>

			</div>

			{/* form will show in modal when triggered */}
			<div className="unit-appliances unit-item">
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