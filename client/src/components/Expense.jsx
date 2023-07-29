import { ExpenseUpdateForm } from "./forms/index.js";
import { useState } from "react";

const Expense = (expense) => {
	const { type, unit, description, payTo, amount, recurring, dateDue, datePaid, balance, status, comments } = expense

	const [showExpenseUpdateForm, setShowExpenseUpdateForm] = useState(false)

	return (
		<div className="expense">
			<div className="expense-info">
				<h5>{payTo}</h5>
				<h5>{amount}</h5>
				<h5>{status}</h5>
			</div>


			<div>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowExpenseUpdateForm(true)}>edit expense</button>

				{ showExpenseUpdateForm && <ExpenseUpdateForm expense={expense} setShowExpenseUpdateForm={setShowExpenseUpdateForm}/>}

			</div>


		</div>
	);
};

export default Expense;