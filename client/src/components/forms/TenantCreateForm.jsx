import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import FormRow from "./FormRow.jsx";
import ModalWrapper from "./ModalWrapper.jsx";

const initialState = {
	unit: null,
	lastName: '',
	firstName: '',
	email: '',
	phone: '',
	balance: 0,
	isAssisted: false,
	rentAssistance: {
		tenantPortion: 0,
		assistedPortion: 0,
		agent: {
			name: '',
			agency: '',
			phone: '',
			email: ''
		}
	}
}

const TenantCreateForm = ({setShowCreateTenantForm, tenant}) => {

	const [values, setValues] = useState(initialState)

	const { unit, lastName, firstName, email, phone, balance, isAssisted, rentAssistance } = tenant

	const { id, displayAlert, clearAlert, createTenant } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		values._id = id
		const { lastName, firstName } = values
		if ( !lastName || !firstName) {
			toast.error('Enter all values')
			return
		}
		createTenant({...values, unit: id})
		toast.success('TenantUnit Successfully Created')
	}

	return (
		<ModalWrapper>
		<div className='modal border-solid border-4 rounded-3xl p-24'>

			<div className="text-center text-2xl pb-12">Add new Tenant</div>

			<form
				className="form grid grid-auto-columns: minmax(0, 1fr) place-items-stretch gap-x-8 content-around h-5/6"
				onSubmit={handleSubmit}
			>
				<FormRow
					labelText="lastName" type="text" name="lastName"
					value={values.lastName} handleChange={handleChange}
					style="col-span-2"
				/>
				<FormRow
					labelText="firstName" type="text" name="firstName"
					value={values.firstName} handleChange={handleChange}
					style="col-span-2"
				/>
				<FormRow
					labelText="email" type="email" name="email"
					value={values.email} handleChange={handleChange}
					style="col-span-3"
				/>
				<FormRow
					labelText="phone" type="text" name="phone"
					value={values.phone} handleChange={handleChange}
					style="col-span-2"
				/>
				<FormRow
					labelText="rent" type="number" name="rent"
					value={values.rent} handleChange={handleChange}
					style="col-span-1"
				/>
				<FormRow
					labelText="balance" type="number" name="balance"
					value={values.balance} handleChange={handleChange}
					style="col-span-1"
				/>
				<FormRow
					labelText="isAssisted" type="boolean" name="isAssisted"
					value={values.isAssisted} handleChange={handleChange}
					style="col-span-1"
				/>

				<div className="tenant-form-assisted grid col-span-5 place-items-stretch gap-x-8 content-around">
					<FormRow
						labelText="rentAssistance" type="number" name="rentAssistance"
						value={values.rentAssistance} handleChange={handleChange}
						style="col-span-1"
					/>
					<FormRow
						labelText="assistedPortion" type="number" name="assistedPortion"
						value={values.assistedPortion} handleChange={handleChange}
						style="col-start-2"
					/>

					<div className="tenant-form-assisted grid col-span-6 place-items-stretch gap-x-8 gap-y-4 content-around">
						<FormRow
							labelText="agentName" type="text" name="agentName"
							value={values.agent?.name} handleChange={handleChange}
							style="col-span-1"
						/>
						<FormRow
							labelText="agency" type="text" name="agency"
							value={values.agent?.agency} handleChange={handleChange}
							style="col-start-2"
						/>
						<FormRow
							labelText="agentPhone" type="text" name="agentPhone"
							value={values.agent?.phone} handleChange={handleChange}
						/>
						<FormRow
							labelText="agentEmail" type="email" name="agentEmail"
							value={values.agent?.email} handleChange={handleChange}
						/>
					</div>

				</div>

				<div className="flex justify-around pt-10 col-span-5">
					<button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs'>create tenant</button>

					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowCreateTenantForm(false)}>cancel</button>
				</div>

			</form>
		</div>
		</ModalWrapper>
	);
};

export default TenantCreateForm;