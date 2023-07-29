import {Expense} from "../../components/index.js";
import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {Loading} from "../../components/index.js";
import { ExpenseCreateForm } from "../../components/forms/index.js";
import UnitNewForm from "../../components/forms/UnitNewForm.jsx";


const initialState = {
	unit: '',
	lastName: '',
	firstName: '',
	email: '',
	phone: '',
	rent: '',
}

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
			<h2>Expenses</h2>

			<div className="payments-container">
				{expenses?.map(expense => {
					return (
						<div key={expense._id} className="payments-container">
							<Expense {...expense}/>
						</div>
					)
				})}
			</div>


			<div className="mr-10">

				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowCreateExpenseForm(true)}>add Unit</button>

				{ showCreateExpenseForm && <ExpenseCreateForm setShowCreateExpenseForm={setShowCreateExpenseForm}/>}
			</div>




		</div>
	);
};

export default Accounting;