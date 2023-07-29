import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Appliance } from "../index.js";
import { useState } from "react";
import ApplianceCreateForm from "../forms/ApplianceCreateForm.jsx";

const AppliancesUnit = (unit_id) => {

	const { appliances } = useGlobalContext()

	const [showCreateApplianceForm, setShowCreateApplianceForm] = useState(false)

	return (
		<div className="appliances">

			<div className="text-center text-2xl mb-12">Appliances</div>

			<div>
				{
					appliances?.map(appliance => {
						return (
							<Appliance key={appliance._id} appliance={appliance} />
						)
					})
				}
			</div>

			<div className="text-center">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={()=>setShowCreateApplianceForm(true)}>
					add appliance
				</button>

				<div className="appliance-form">
					{showCreateApplianceForm && <ApplianceCreateForm {...unit_id} setShowCreateApplianceForm={setShowCreateApplianceForm}/>}
				</div>
			</div>


		</div>
	);
};

export default AppliancesUnit;