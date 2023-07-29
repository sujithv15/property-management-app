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
		<div className="page">

			<div className="text-center my-5 text-2xl">Accounting</div>

			<div className="text-center text-xl">Upcoming expenses</div>

			<div className="grid grid-cols-6 mb-2 justify-items-start">
				<p className="text-xl font-bold">Due Date</p>
				<p className="text-xl font-bold">Type</p>
				<p className="text-xl font-bold">Description</p>
				<p className="text-xl font-bold">Payee</p>
				<p className="text-xl font-bold">Amount</p>
				<p className="text-xl font-bold">Status</p>
			</div>

			<div className="payments-container">
				{expenses?.map(expense => {
					return (
						<div key={expense._id} className="payments-container">
							<Expense {...expense}/>
						</div>
					)
				})}
			</div>


			<div className="">

				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowCreateExpenseForm(true)}>Create Expense</button>

				{ showCreateExpenseForm && <ExpenseCreateForm setShowCreateExpenseForm={setShowCreateExpenseForm}/>}
			</div>




		</div>
	);
};

export default Accounting;