import FormRow from "./FormRow.jsx";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import FormRowSelect from "./FormRowSelect.jsx";
import { toast } from "react-toastify";


const types = ['insurance', 'taxes', 'regular maintenance', 'repairs', 'other']

const PaymentCreateForm = (payment) => {

	const { displayAlert, clearAlert } = useGlobalContext()

	const [values, setValues] = useState({ payment })

	// get list of units to display so user can select unit
	const [unitOptions, setUnitOptions] = useState()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { type } = values
		if (!type) {
			displayAlert()
			clearAlert()
			return
		}
		// updatePayment(values)
		toast.success('Payment Successfully Created')
	}

	useEffect(() => {
		const unitList = units.map(unit => `${unit.propertyUnit} ${unit.street}`)
		unitList.push('other')
		setUnitOptions(unitList)
	}, [])

	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<FormRowSelect labelText="type" name="type" value={values.type} handleChange={handleChange} list={types}/>
				<FormRowSelect labelText="unit" name="unit" value={values.unit} handleChange={handleChange} list={unitOptions}/>
				<FormRow labelText="description" type="text" name="description" value={values.description} handleChange={handleChange}/>
				<FormRow labelText="payTo" type="text" name="payTo" value={values.payTo} handleChange={handleChange}/>
				<FormRow labelText="amount" type="number" name="amount" value={values.amount} handleChange={handleChange}/>
				<FormRow labelText="recurring" type="boolean" name="recurring" value={values.recurring} handleChange={handleChange}/>
				<FormRow labelText="dateDue" type="date" name="dateDue" value={values.dateDue} handleChange={handleChange}/>
				<FormRow labelText="datePaid" type="date" name="datePaid" value={values.datePaid} handleChange={handleChange}/>
				<FormRow labelText="balance" type="number" name="balance" value={values.balance} handleChange={handleChange}/>
				<FormRowSelect labelText="status" name="status" value={values.status} handleChange={handleChange} list={['paid', 'unpaid', 'pending']}/>
				<FormRow labelText="comments" type="text" name="comments" value={values.comments} handleChange={handleChange}/>
			</form>
		</div>
	);
};

export default PaymentCreateForm;