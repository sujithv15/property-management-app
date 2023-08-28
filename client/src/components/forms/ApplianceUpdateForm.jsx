import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";
import { toast } from "react-toastify";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import ModalWrapper from "./ModalWrapper.jsx";

const ApplianceUpdateForm = ({ appliance, setShowForm }) => {

	const [values, setValues] = useState(appliance)

	const { updateAppliance } = useGlobalContext()
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		updateAppliance(values)
		toast.success('Appliance Created')
		setShowForm(false)
	}

	return (
		<ModalWrapper>
			<div className="modal max-w-sm">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Edit Appliance</div>
					<div className="form-content">
						<div>Appliance type: {appliance.appliance}</div>
						<div>Purchase Date: {appliance.datePurchased.substring(0,10)}</div>
						<FormRow
							labelText="warranty" type="text" name="warranty"
							value={values.warranty} handleChange={handleChange}
						/>
						<FormRow
							labelText="receipt" type="text" name="receipt"
							value={values.receipt} handleChange={handleChange}
						/>

						<div className="flex justify-around pt-10">
							<button type="submit" className='btn'>update appliance</button>
							<button className="btn" onClick={() => setShowForm(false)}>Cancel</button>
						</div>
					</div>
				</form>
			</div>
		</ModalWrapper>
	);
};

export default ApplianceUpdateForm;