import FormRow from "./FormRow.jsx";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import FormRowSelect from "./FormRowSelect.jsx";
import { toast } from "react-toastify";
import ModalWrapper from "./ModalWrapper.jsx";

const initialState = {
	type: '',
	unit: '',
	description: '',
	payTo: '',
	amount: 0,
	recurring: false,
	dateDue: '',
	datePaid: '',
	balance: 0,
	status: 'unpaid',
	comments: ''
}

const types = ['Insurance', 'Taxes', 'Maintenance', 'Repairs', 'Other']

const ExpenseCreateForm = ({ setShowCreateExpenseForm }) => {

	const [values, setValues] = useState(initialState)

	const { displayAlert, clearAlert, createExpense, units } = useGlobalContext()

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
		createExpense(values)
		toast.success('Expense Successfully Created')
	}


	return (
		<ModalWrapper>
			<div className='modal border-solid border-4 rounded-3xl p-24'>
				<div className="text-center text-2xl pb-12">Create New Expense</div>
				<form className="form" onSubmit={handleSubmit}>
					<FormRowSelect labelText="type" name="type" value={values.type} handleChange={handleChange} list={types}/>
					<FormRow labelText="unit" type="text" name="unit" value={values.unit} handleChange={handleChange}/>
					<FormRow labelText="description" type="text" name="description" value={values.description} handleChange={handleChange}/>
					<FormRow labelText="payTo" type="text" name="payTo" value={values.payTo} handleChange={handleChange}/>
					<FormRow labelText="amount" type="number" name="amount" value={values.amount} handleChange={handleChange}/>
					<FormRow labelText="recurring" type="boolean" name="recurring" value={values.recurring} handleChange={handleChange}/>
					<FormRow labelText="dateDue" type="date" name="dateDue" value={values.dateDue} handleChange={handleChange}/>
					<FormRow labelText="datePaid" type="date" name="datePaid" value={values.datePaid} handleChange={handleChange}/>
					<FormRow labelText="balance" type="number" name="balance" value={values.balance} handleChange={handleChange}/>
					<FormRowSelect labelText="status" name="status" value={values.status} handleChange={handleChange} list={['paid', 'unpaid', 'pending']}/>
					<FormRow labelText="comments" type="text" name="comments" value={values.comments} handleChange={handleChange}/>

					<div className="flex justify-around pt-10">
						<button
							type="submit"
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs'>
							Add Expense
						</button>

						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
							onClick={() => setShowCreateExpenseForm(false)}>
							Cancel
						</button>
					</div>

				</form>
			</div>
		</ModalWrapper>
	);
};

export default ExpenseCreateForm;