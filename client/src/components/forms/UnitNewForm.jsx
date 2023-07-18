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
	mortgage: '',
}

const UnitNewForm = ({ setShowForm }) => {

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
		toast.success('UnitDetails Successfully Created')
	}

	return (
		<div className='border-solid border-4 rounded-3xl my-20 px-20 py-10 mx-auto max-w-2xl'>

			<div className="text-center">
				<h2 className="text-center m-10 text-2xl">Add new unit</h2>
			</div>

			<form className="form m-10 space-y-10" onSubmit={handleSubmit}>
				<FormRow labelText="unit" type="text" name="propertyUnit" value={values.propertyUnit} handleChange={handleChange}/>
				<FormRow labelText="street" type="text" name="street" value={values.street} handleChange={handleChange}/>
				<FormRow labelText="city" type="text" name="city" value={values.city} handleChange={handleChange}/>
				<FormRow labelText="state" type="text" name="state" value={values.state} handleChange={handleChange}/>
				<FormRow labelText="zip" type="text" name="zip" value={values.zip} handleChange={handleChange}/>
				<FormRow labelText="bedrooms" type="number" name="bedrooms" value={values.bedrooms} handleChange={handleChange}/>
				<FormRow labelText="bathrooms" type="number" name="bathrooms" value={values.bathrooms} handleChange={handleChange}/>
				<FormRow labelText="rent" type="number" name="rent" value={values.rent} handleChange={handleChange}/>
				<FormRow labelText="fmrRent" type="number" name="fmrRent" value={values.fmrRent} handleChange={handleChange}/>

				<div className="flex justify-around">
					<button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs'>create tenant</button>

					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowForm(false)}>cancel</button>
				</div>


			</form>
		</div>
	);
};


export default UnitNewForm;