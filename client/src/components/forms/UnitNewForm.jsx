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
	appliances: [],
	expenses: []
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
		toast.success('Unit Created')
		setShowForm(false)
	}

	return (
		<ModalWrapper>
			<div className='modal max-w-lg'>
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Create Unit</div>
					<div className="form-content grid-cols-6">
						<FormRow
							labelText="unit" type="text" name="unitID"
							value={values.unitID} handleChange={handleChange}
							style="col-span-2"
						/>
						<FormRow
							labelText="street" type="text" name="street"
							value={values.street} handleChange={handleChange}
							style="col-span-4"
						/>
						<FormRow
							labelText="city" type="text" name="city"
							value={values.city} handleChange={handleChange}
							style="col-span-3"
						/>
						<FormRow
							labelText="state" type="text" name="state"
							value={values.state} handleChange={handleChange}
							style="col-span-1"
						/>
						<FormRow
							labelText="zip" type="text" name="zip"
							value={values.zip} handleChange={handleChange}
							style="col-span-2"
						/>
						<FormRow
							labelText="bedrooms" type="number" name="bedrooms"
							value={values.bedrooms} handleChange={handleChange}
							style="col-span-1"
						/>

						<FormRow
							labelText="bathrooms" type="number" name="bathrooms"
							value={values.bathrooms} handleChange={handleChange}
							style="col-span-1"
						/>
						<FormRow
							labelText="rent" type="number" name="rent"
							value={values.rent} handleChange={handleChange}
							style="col-start-4 col-span-2"
						/>
					</div>

						<div className="flex justify-around pt-10">
							<button
								type="submit"
								className='btn'>
								Create Unit
							</button>

							<button
								className="btn"
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