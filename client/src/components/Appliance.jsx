import { ApplianceUpdateForm } from "./forms/index.js";

import { useState } from "react";

const Appliance = ( {appliance }) => {

	const [showForm, setShowForm] = useState(false)

	return (
		<div className="appliance">

			<div className="flex flex-col mx-auto m-8 gap-2 border-4 rounded-3xl p-3 w-fit">

				<div
					className="px-3 text-xl font-bold underline text-blue-500 hover:cursor-pointer hover:text-cyan-500 rounded-md"
					onClick={() => setShowForm(true)}
				>{appliance.appliance}
				</div>

				<p className="text-xl flex gap-3">Date purchased:<span>{appliance.datePurchased.substring(0, 10)}</span></p>
				<p className="text-xl flex gap-3">Warranty:<span>{appliance.warranty || "-"}</span> </p>
				<p className="text-xl flex gap-3">Receipt:<span>{appliance.receipt || "-"}</span> </p>

			</div>

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