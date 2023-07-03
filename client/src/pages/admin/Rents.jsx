import {useState, useEffect} from "react";
import axios from "axios";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import {Loading} from "../../components/index.jsx";
import {Unit} from "../../components/index.jsx";
import Rent from "../../components/forms/Rent.jsx";

const initialState = {
	amount: '',
	balance: '',
	isAssisted: '',
	rentAssistance: '',
}

const Rents = () => {


	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, isLoading, createRent, readRents, rents } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { amount, balance, isAssisted, rentAssistance } = values
		if (!amount) {
			displayAlert()
			clearAlert()
			return
		}

		const rent = { amount, balance, isAssisted, rentAssistance }
		createRent(rent)
		toast.success('rent Successfully Created')
	}

	useEffect(() => {
		readRents()
	}, [])

	if (isLoading) {
		return <Loading center />;
	}
	if (rents.length === 0) {
		return (
			<h2>No rents to display...</h2>
		);
	}

	return (
		<div className="page">
			<div className="rents-container">
				{rents?.map(rent => {
					return (
						<div key={rent._id} className="rent-container">
							<Rent {...rent}/>
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default Rents;