import { useEffect, useState } from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {toast} from "react-toastify";
import FormRow from "./FormRow.jsx";
import ModalWrapper from "./ModalWrapper.jsx";

// FIXME unit component not re-rendering on form update
const UnitUpdateForm = ({ unit, setShowUnitUpdateForm }) => {

	const { updateUnit, readUnits } = useGlobalContext()

	const [values, setValues] = useState(unit)

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		updateUnit(values)
		toast.success('UnitDetails Successfully Updated')
		setShowUnitUpdateForm(false)
	}


	return (
		<ModalWrapper>
		<div className="modal">
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-title">Edit Unit Details</div>
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
						Update Unit
					</button>
					<button
						className="btn"
						onClick={() => setShowUnitUpdateForm(false)}>
						Cancel
					</button>

				</div>

			</form>
		</div>

		</ModalWrapper>
	);
};


export default UnitUpdateForm;