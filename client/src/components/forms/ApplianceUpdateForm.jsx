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
		toast.success('Appliance Successfully Created')
		setShowForm(false)
	}

	return (
		<ModalWrapper>
			<div className="modal border-solid border-4 rounded-3xl p-24">
				<form className="form" onSubmit={handleSubmit}>
					<div>Appliance type: {appliance.appliance}</div>
					<div>Purchase Date: {appliance.datePurchased}</div>
					<FormRow labelText="warranty" type="text" name="warranty" value={values.warranty} handleChange={handleChange}/>
					<FormRow labelText="receipt" type="text" name="receipt" value={values.receipt} handleChange={handleChange}/>

					<div className="flex justify-around pt-10">
						<button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs'>update appliance</button>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowForm(false)}>Cancel</button>
					</div>

				</form>
			</div>
		</ModalWrapper>
	);
};

export default ApplianceUpdateForm;