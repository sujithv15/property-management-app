import { ApplianceUpdateForm } from "./forms/index.js";

import { useState } from "react";

const Appliance = ( {appliance }) => {

	const [showForm, setShowForm] = useState(false)

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 mb-4 pt-3 justify-items-start border-t-2 h-24 overflow-hidden">

				<div
					className="px-3 text-xl font-bold underline text-blue-500 hover:cursor-pointer hover:text-cyan-500 rounded-md"
					onClick={() => setShowForm(true)}
				>{appliance.appliance}
				</div>

				<p className="text-xl flex gap-3">{appliance.datePurchased.substring(0, 10)}</p>
				<p className="text-xl flex gap-3 hidden sm:block">{appliance.warranty || "-"}</p>


			<div className="grid grid-cols-4 justify-items-left">






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