import { ExpenseUpdateForm } from "./forms/index.js";
import { useState } from "react";

const Expense = (expense) => {
	const { type, description, payTo, amount, recurring, dateDue, datePaid, balance, status, comments } = expense



	const [showExpenseUpdateForm, setShowExpenseUpdateForm] = useState(false)

	return (
		<div className="expense">
			<div className="grid grid-cols-4 sm:grid-cols-7 py-8 pl-4 justify-items-start text-sm overflow-hidden">
				<div>{dateDue?.substring(0,10)}</div>
				<div className="hidden sm:block">{type}</div>
				<div className="col-span-2">{payTo}</div>
				<div className="hidden sm:block">{amount}</div>
				<div className="hidden sm:block">{status}</div>
				<div>
					<button className="btn" onClick={() => setShowExpenseUpdateForm(true)}>edit</button>

					{ showExpenseUpdateForm && <ExpenseUpdateForm expense={expense} setShowExpenseUpdateForm={setShowExpenseUpdateForm}/>}

				</div>
			</div>





		</div>
	);
};

export default Expense;