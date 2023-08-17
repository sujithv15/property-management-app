import FormRow from "./FormRow.jsx";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import FormRowSelect from "./FormRowSelect.jsx";
import { toast } from "react-toastify";
import ModalWrapper from "./ModalWrapper.jsx";

const types = ['insurance', 'taxes', 'maintenance', 'repairs', 'other']

const ExpenseUpdateForm = ({ expense, setShowExpenseUpdateForm }) => {

	const { updateExpense, displayAlert, clearAlert, units } = useGlobalContext()
	const [values, setValues] = useState(expense)

	// populate array with list of units(just unitID and street) and 'NONE' for form
	const unitList = ["None", ...units.map(unit => `${unit.unitID} ${unit.street}`)]

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

		// if user selects None for unit, assign to null, else find unit and set to values (using string we created)
		if (values.unit === "None") {
			values.unit = undefined
		}
		else {
			values.unit = units.find(unit => `${unit.unitID} ${unit.street}` === values.unit)
		}

		updateExpense(values)
		toast.success('Expense Successfully Updated')
		setShowExpenseUpdateForm(false)
	}

	return (
		<ModalWrapper>
			<div className='modal max-w-lg'>
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Edit Expense</div>
					<div className="grid grid-cols-4 gap-x-2">
						<FormRowSelect
							labelText="type" name="type"
							value={values.type} handleChange={handleChange} list={types}
							style="col-span-2"
						/>
						<FormRowSelect
							labelText="unit" name="unit"
							value={values.unit} handleChange={handleChange} list={unitList}
							style="col-span-2"
						/>
						<FormRow
							labelText="Description" type="text" name="description"
							value={values.description} handleChange={handleChange}
							style="col-span-4"
						/>
						<FormRow
							labelText="Payment To" type="text" name="payTo"
							value={values.payTo} handleChange={handleChange}
							style="col-span-4"
						/>
						<FormRow
							labelText="amount" type="number" name="amount"
							value={values.amount} handleChange={handleChange}
							style="col-span-2"
						/>
						<FormRow
							labelText="balance" type="number" name="balance"
							value={values.balance} handleChange={handleChange}
							style="col-span-2"
						/>
						<FormRowSelect
							labelText="recurring" name="recurring"
							value={values.recurring} handleChange={handleChange} list={['Yes', 'No']}
							style="col-span-2"
						/>
						<FormRowSelect
							labelText="status" name="status"
							value={values.status} handleChange={handleChange} list={['paid', 'unpaid', 'pending']}
							style="col-span-2"
						/>
						<FormRow
							labelText="date Due" type="date" name="dateDue"
							value={values.dateDue} handleChange={handleChange}
							style="col-span-2"
						/>
						<FormRow
							labelText="date Paid" type="date" name="datePaid"
							value={values.datePaid} handleChange={handleChange}
							style="col-span-2"
						/>

						<FormRow
							labelText="Comments" type="text" name="comments"
							value={values.comments} handleChange={handleChange}
							style="col-span-4"
						/>
					</div>
					<div className="flex justify-center gap-6">
						<button type="submit" className='btn'>Update</button>
						<button className="btn" onClick={() => setShowExpenseUpdateForm(false)}>Cancel</button>
					</div>


				</form>
			</div>
		</ModalWrapper>
	);
};

export default ExpenseUpdateForm;