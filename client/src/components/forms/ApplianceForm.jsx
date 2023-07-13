import { useState } from "react";
import {  useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRowSelect from "./FormRowSelect.jsx";
import FormRow from "./FormRow.jsx";

const initialState = {
	appliance: '',
	datePurchased: '',
	repairs: '',
	warranty: '',
	receipt: ''
}

const applianceList = ['refrigerator', 'microwave', 'stove', 'dishwasher', 'air-conditioner', 'water heater', 'washer', 'dryer']

const ApplianceForm = ({ unit }) => {

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
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<FormRow labelText="unit" type="text" name="unit" value={unit} readOnly={true}/>
				<FormRowSelect labelText="appliance" name="appliance" value={values.appliance} handleChange={handleChange} list={applianceList}/>
				<FormRow labelText="date purchased" type="text" name="datePurchased" value={values.datePurchased} handleChange={handleChange}/>
				<FormRow labelText="repairs" type="text" name="repairs" value={values.repairs} handleChange={handleChange}/>
				<FormRow labelText="warranty" type="text" name="warranty" value={values.warranty} handleChange={handleChange}/>
				<FormRow labelText="receipt" type="text" name="receipt" value={values.receipt} handleChange={handleChange}/>
				<button type="submit" className='btn'>create appliance</button>
			</form>
		</div>
	);
};

export default ApplianceForm;