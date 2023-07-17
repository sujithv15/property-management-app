import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import FormRowSelect from "./FormRowSelect.jsx";

const initialState = {
	propertyUnit: '',
	street: '',
	city: '',
	state: '',
	zip: '',
	isPrimary: false,
	primary: null,
	tenant: null,
	user: null,
	bedrooms: 0,
	bathrooms: 0,
	rent: 0,
	fmrRent: 0,
	appliances: null,
	mortgage: null,
}

const UnitNewForm = () => {

	const [values, setValues] = useState(initialState)

	const { createUnit } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { propertyUnit } = values
		if (!propertyUnit) {
			toast('Enter a valid unit')
			return
		}
		createUnit(values)
		toast.success('Unit Successfully Created')
	}

	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>

				<FormRow labelText="unit" type="text" name="propertyUnit" value={values.propertyUnit} handleChange={handleChange}/>
				<FormRow labelText="street" type="text" name="street" value={values.street} handleChange={handleChange}/>
				<FormRow labelText="city" type="text" name="city" value={values.city} handleChange={handleChange}/>
				<FormRow labelText="state" type="text" name="state" value={values.state} handleChange={handleChange}/>
				<FormRow labelText="zip" type="text" name="zip" value={values.zip} handleChange={handleChange}/>
				<FormRow labelText="bedrooms" type="number" name="bedrooms" value={values.bedrooms} handleChange={handleChange}/>
				<FormRow labelText="bathrooms" type="number" name="bathrooms" value={values.bathrooms} handleChange={handleChange}/>
				<FormRow labelText="rent" type="number" name="rent" value={values.rent} handleChange={handleChange}/>
				<FormRow labelText="fmrRent" type="number" name="fmrRent" value={values.fmrRent} handleChange={handleChange}/>

				<button type="submit" className='relative top-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs'>create unit</button>
			</form>
		</div>
	);
};


export default UnitNewForm;