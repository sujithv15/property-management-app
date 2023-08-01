import { ExpenseUpdateForm } from "./forms/index.js";
import { useState } from "react";

const Expense = (expense) => {
	const { type, unit, description, payTo, amount, recurring, dateDue, datePaid, balance, status, comments } = expense



	const [showExpenseUpdateForm, setShowExpenseUpdateForm] = useState(false)

	return (
		<div className="expense">
			<div className="grid grid-cols-6 mb-6 justify-items-start">
				<div>{dateDue?.substring(0,10)}</div>
				<div>{type}</div>
				<div>{payTo}</div>
				<div>{amount}</div>
				<div>{status}</div>
				<div>
					<button className="btn" onClick={() => setShowExpenseUpdateForm(true)}>edit expense</button>

					{ showExpenseUpdateForm && <ExpenseUpdateForm expense={expense} setShowExpenseUpdateForm={setShowExpenseUpdateForm}/>}

				</div>
			</div>





		</div>
	);
};

export default Expense;