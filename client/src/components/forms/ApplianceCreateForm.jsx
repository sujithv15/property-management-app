import { useState } from "react";
import {  useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRowSelect from "./FormRowSelect.jsx";
import FormRow from "./FormRow.jsx";
import ModalWrapper from "./ModalWrapper.jsx";

const initialState = {
	appliance: '',
	datePurchased: '',
	repairs: '',
	warranty: '',
	receipt: ''
}

const applianceList = ['refrigerator', 'microwave', 'stove', 'dishwasher', 'air-conditioner', 'water heater', 'washer', 'dryer']

const ApplianceCreateForm = ({ unit, setShowCreateApplianceForm }) => {

	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, isLoading, createAppliance, units } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { appliance, datePurchased, repairs, warranty, receipt } = values
		if (!appliance) {
			displayAlert()
			clearAlert()
			return
		}
		const newAppliance = { unit, appliance, datePurchased, repairs, warranty, receipt }
		createAppliance(newAppliance)
		toast.success('Appliance Successfully Created')
	}

	return (
		<ModalWrapper>
			<div className="modal  border-solid border-4 rounded-3xl p-24">
				<div className="text-center text-2xl pb-12">Add new appliance</div>

				<form
					className="form grid grid-auto-columns: minmax(0, 1fr) place-items-stretch gap-x-8 content-around h-5/6"
					onSubmit={handleSubmit}
				>

					<FormRow labelText="unit" type="text" name="unit" value={unit} readOnly/>
					<FormRowSelect labelText="appliance" name="appliance" value={values.appliance} handleChange={handleChange} list={applianceList}/>
					<FormRow labelText="date purchased" type="text" name="datePurchased" value={values.datePurchased} handleChange={handleChange}/>
					<FormRow labelText="repairs" type="text" name="repairs" value={values.repairs} handleChange={handleChange}/>
					<FormRow labelText="warranty" type="text" name="warranty" value={values.warranty} handleChange={handleChange}/>
					<FormRow labelText="receipt" type="text" name="receipt" value={values.receipt} handleChange={handleChange}/>

					<div className="flex justify-around pt-10">
						<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs">create appliance</button>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowCreateApplianceForm(false)}>Cancel</button>
					</div>

				</form>
			</div>
		</ModalWrapper>
	);
};

export default ApplianceCreateForm;