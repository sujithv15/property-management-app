import {Expense} from "../../components/index.js";
import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {Loading} from "../../components/index.js";
import { ExpenseCreateForm } from "../../components/forms/index.js";


const Accounting = () => {

	const { readExpenses, expenses, isLoading, units } = useGlobalContext()

	const [showCreateExpenseForm, setShowCreateExpenseForm] = useState(false)

	useEffect(() => {
		readExpenses()
	}, [])

	if (isLoading) {
		return <Loading />;
	}


	return (
		<div className="accounting-page pb-20">

			<div className="title">Accounting</div>

			<div className="text-center text-xl border-t-2 pt-12">Upcoming expenses</div>

			<div className="grid grid-cols-6 mb-2 justify-items-start pt-4 my-4">
				<p className="text-xl font-bold">Due Date</p>
				<p className="text-xl font-bold">Type</p>
				<p className="text-xl font-bold">Payee</p>
				<p className="text-xl font-bold">Amount</p>
				<p className="text-xl font-bold">Status</p>
			</div>

			<div className="payments-container">
				{expenses?.map(expense => {
					return (
							<Expense key={expense._id} {...expense}/>
					)
				})}
			</div>


			<div className="">

				<button className="btn" onClick={() => setShowCreateExpenseForm(true)}>Create Expense</button>

				{ showCreateExpenseForm && <ExpenseCreateForm setShowCreateExpenseForm={setShowCreateExpenseForm}/>}
			</div>




		</div>
	);
};

export default Accounting;