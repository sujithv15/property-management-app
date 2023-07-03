import {Tenant} from "../../components/index.jsx";
import Property from "../../components/Property.jsx";
import FormRow from "../../components/forms/FormRow.jsx";
import {toast} from "react-toastify";
import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {useEffect} from "react";
import {Loading} from "../../components/index.jsx";
import TenantForm from "../../components/forms/TenantForm.jsx";

const initialState = {
	unit: '',
	lastName: '',
	firstName: '',
	email: '',
	phone: '',
	rent: '',
}

const Tenants = () => {

	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, isLoading, createTenant, readTenants, tenants } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { unit, lastName, firstName } = values
		if (!unit || !lastName || !firstName) {
			displayAlert()
			clearAlert()
			return
		}

		const tenant = { unit, lastName, firstName }
		createTenant(tenant)
		toast.success('Tenant Successfully Created')
	}

	useEffect(() => {
		readTenants()
	}, [])

	if (isLoading) {
		return <Loading center />;
	}
	if (tenants.length === 0) {
		return (
			<h2>No tenants to display...</h2>
		);
	}
	return (
		<div className="page">
			<h2>Tenants</h2>

			<div className="display-container tenants">
				{tenants?.map(tenant => {
					return (
						<div key={tenant._id} className="tenant-container">
							<Tenant {...tenant}/>
						</div>
					)
				})}
			</div>

			<TenantForm />

		</div>
	);
};

export default Tenants;