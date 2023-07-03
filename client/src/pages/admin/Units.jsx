import {Unit} from "../../components";
import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {Loading} from "../../components";
import UnitForm from "../../components/forms/UnitForm.jsx";


const initialState = {
	property: '',
	address: '',
	status: '',
	tenant: '',
	rent: '',
	fmrRent: '',
}

const Units = () => {

	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, isLoading, createUnit, readUnits, units } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { property, address, status } = values
		if (!property || !address || !status) {
			displayAlert()
			clearAlert()
			return
		}

		const unit = { property, address, status }
		createUnit(unit)
		toast.success('Unit Successfully Created')
	}

	useEffect(() => {
		readUnits()
	}, [])

	if (isLoading) {
		return <Loading center />;
	}
	if (units.length === 0) {
		return (
			<h2>No units to display...</h2>
		);
	}

	return (
		<div className="page">
			<div className="display-container units">
				{units?.map(unit => {
					return (
						<div key={unit._id} className="unit-container">
							<Unit {...unit}/>
						</div>
					)
				})}
			</div>

			<UnitForm />

		</div>
	);
};

export default Units;