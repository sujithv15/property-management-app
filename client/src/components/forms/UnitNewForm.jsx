import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import ModalWrapper from "./ModalWrapper.jsx";

const initialState = {
	unitID: '',
	street: '',
	city: '',
	state: '',
	zip: '',
	occupied: false,
	tenant: null,
	user: null,
	bedrooms: 0,
	bathrooms: 0,
	rent: 0,
	fmrRent: 0,
	appliances: null,
	expenses: null
}

const UnitNewForm = ({ setShowForm }) => {

	const [values, setValues] = useState(initialState)

	const { createUnit } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { unitID } = values
		if (!unitID) {
			toast('Enter a valid unit')
			return
		}
		createUnit(values)
		toast.success('UnitDetails Successfully Created')
		setShowForm(false)
	}

	return (
		<ModalWrapper>
			<div className='modal border-solid border-4 rounded-3xl p-24'>

				<div className="text-center text-2xl pb-12">Add new unit</div>

				<form
					className="form grid grid-auto-columns: minmax(0, 1fr) place-items-stretch gap-x-8 content-around h-5/6 "
					onSubmit={handleSubmit}>

					<FormRow
						labelText="unit" type="text" name="unitID"
						value={values.unitID} handleChange={handleChange}
						style="col-span-3"
					/>
					<FormRow
						labelText="street" type="text" name="street"
						value={values.street} handleChange={handleChange}
						style="col-span-7"
					/>
					<FormRow
						labelText="city" type="text" name="city"
						value={values.city} handleChange={handleChange}
						style="col-span-4"
					/>
					<FormRow
						labelText="state" type="text" name="state"
						value={values.state} handleChange={handleChange}
						style="col-span-2"
					/>
					<FormRow
						labelText="zip" type="text" name="zip"
						value={values.zip} handleChange={handleChange}
						style="col-span-4"
					/>
					<FormRow
						labelText="bedrooms" type="number" name="bedrooms"
						value={values.bedrooms} handleChange={handleChange}
						style="col-start-2 col-span-3"
					/>

					<FormRow
						labelText="bathrooms" type="number" name="bathrooms"
						value={values.bathrooms} handleChange={handleChange}
						style="col-start-5 col-span-3"
					/>

					<FormRow
						labelText="rent" type="number" name="rent"
						value={values.rent} handleChange={handleChange}
						style="row-start-4 col-start-2 col-span-2"
					/>

					<div className="flex justify-around pt-10">
						<button
							type="submit"
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs'>
							Create Unit
						</button>

						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
							onClick={() => setShowForm(false)}>
							Cancel
						</button>

					</div>
				</form>

			</div>
		</ModalWrapper>
	);
};


export default UnitNewForm;