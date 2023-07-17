import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";
import { toast } from "react-toastify";
import { useState } from "react";

const ApplianceUpdateForm = (appliance) => {

	const [values, setValues] = useState(appliance)

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
				<button type="submit" className='btn'>update appliance</button>
			</form>
		</div>
	);
};

export default ApplianceUpdateForm;