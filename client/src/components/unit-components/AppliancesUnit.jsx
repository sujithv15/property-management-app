import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Appliance } from "../index.js";
import { useState } from "react";
import ApplianceCreateForm from "../forms/ApplianceCreateForm.jsx";
import UnitNewForm from "../forms/UnitNewForm.jsx";

const AppliancesUnit = (unit_id) => {

	const { appliances } = useGlobalContext()

	const [showCreateApplianceForm, setShowCreateApplianceForm] = useState(false)

	return (
		<div className="appliances">

			<div className="text-3xl text-center mb-4 font-bold">Appliances</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 mb-2" >

				<p className="text-xl ml-4 font-bold">Appliance</p>
				<p className="text-xl font-bold">Date Purchased</p>
				<p className="text-xl font-bold hidden sm:block">Warranty</p>


			</div>

			<ul>
				{
					appliances?.map(appliance => {
						return (
							<li key={appliance._id}>
								<Appliance appliance={appliance} />
							</li>
						)
					})
				}
			</ul>

			<div className="text-center">
				<button
					className="btn"
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