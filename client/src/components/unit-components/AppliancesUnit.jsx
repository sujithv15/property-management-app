import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Appliance } from "../index.js";
import { useState } from "react";
import ApplianceCreateForm from "../forms/ApplianceCreateForm.jsx";

const AppliancesUnit = ({ appliances, _id }) => {

	const [showCreateApplianceForm, setShowCreateApplianceForm] = useState(false)


	return (
		<div>

			<div>
				{
					appliances?.map(appliance => {
						return (
							<Appliance key={appliance._id} appliance={{appliance}} />
						)
					})
				}
			</div>

			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				onClick={()=>setShowCreateApplianceForm(true)}>
				add appliance
			</button>

			<div className="appliance-form">
				{showCreateApplianceForm && <ApplianceCreateForm unit={_id} setShowCreateApplianceForm={setShowCreateApplianceForm}/>}
			</div>

		</div>
	);
};

export default AppliancesUnit;