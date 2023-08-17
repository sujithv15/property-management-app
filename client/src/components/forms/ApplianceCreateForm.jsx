import { useState } from "react";
import {  useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRowSelect from "./FormRowSelect.jsx";
import FormRow from "./FormRow.jsx";
import ModalWrapper from "./ModalWrapper.jsx";

const initialState = {
	unit: {},
	appliance: '',
	datePurchased: '',
	warranty: '',
	receipt: ''
}

const applianceList = ['Refrigerator', 'Microwave', 'Stove', 'Dishwasher', 'Air-Conditioner', 'Water Heater', 'Washer', 'Dryer']

const ApplianceCreateForm = ({ unit_id, setShowCreateApplianceForm }) => {

	const [values, setValues] = useState(initialState)
	const { createAppliance } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!values.appliance) {
			values.appliance = 'refrigerator'
		}
		createAppliance({ ...values, unit: unit_id }, unit_id)
		toast.success('Appliance Successfully Created')
		setShowCreateApplianceForm(false)
	}

	return (
		<ModalWrapper>
			<div className="modal max-w-sm">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Add Appliance</div>
					<div className="form-content">
						<FormRowSelect
							labelText="appliance" name="appliance"
							value={values.appliance} handleChange={handleChange} list={applianceList}

						/>
						<FormRow
							labelText="date purchased" type="date" name="datePurchased"
							value={values.datePurchased} handleChange={handleChange}

						/>
						<FormRow
							labelText="warranty" type="text" name="warranty"
							value={values.warranty} handleChange={handleChange}

						/>
						<FormRow
							labelText="receipt" type="text" name="receipt"
							value={values.receipt} handleChange={handleChange}

						/>
					</div>
					<div className="flex justify-around pt-10">
						<button type="submit" className="btn">create appliance</button>
						<button className="btn" onClick={() => setShowCreateApplianceForm(false)}>Cancel</button>
					</div>

				</form>
			</div>
		</ModalWrapper>
	);
};

export default ApplianceCreateForm;