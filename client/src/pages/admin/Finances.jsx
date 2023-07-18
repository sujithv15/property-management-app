import {Payment} from "../../components/index.js";
import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {Loading} from "../../components/index.js";


const initialState = {
	unit: '',
	lastName: '',
	firstName: '',
	email: '',
	phone: '',
	rent: '',
}

const Finances = () => {

	const [values, setValues] = useState(initialState)
	const { isLoading, createPayment, readPayments, payments } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { payTo, amount, status } = values
		if (!payTo || !amount || !status) {
			toast.error('Enter all values!')
			return
		}

		const payment = { payTo, amount, status }
		createPayment(payment)
		toast.success('Payment Successfully Created')
	}

	useEffect(() => {
		readPayments()
	}, [])

	if (isLoading) {
		return <Loading center />;
	}
	if (payments.length === 0) {
		return (
			<h2>No payments to display...</h2>
		);
	}

	return (
		<div className="page">
			<h2>payments</h2>
			<div className="payments-container">
				{payments?.map(payment => {
					return (
						<div key={payment._id} className="payments-container">
							<Payment {...payment}/>
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default Finances;