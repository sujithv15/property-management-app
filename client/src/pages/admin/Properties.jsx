import {useState} from "react";
import {toast} from "react-toastify";
import {useGlobalContext} from "../../context/GlobalContext";
import {useEffect} from "react";
import PropertyForm from "../../components/forms/PropertyForm.jsx";
import {Loading} from "../../components/index.jsx";
import Property from "../../components/Property.jsx";

const initialState = {
	name: '',
	street: '',
	city: '',
	state: '',
	zip: '',
	numUnits: '',
	unitTypes: '',
}

const Properties = () => {

	const [values, setValues] = useState(initialState)
	const { displayAlert, clearAlert, createProperty, readProperties, isLoading, properties } = useGlobalContext()

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { name, street, city, state, zip, numUnits, unitTypes } = values
		if (!name || !street || !city || !state || !zip || !numUnits || !unitTypes) {
			displayAlert()
			clearAlert()
			return
		}

		const property = { name, street, city, state, zip, numUnits, unitTypes }
		createProperty(property)
		toast.success('Property Successfully Created')
	}

	useEffect(() => {
		readProperties()
	}, [])

	if (isLoading) {
		return <Loading center />;
	}
	if (properties.length === 0) {
		return (
			<h2>No properties to display...</h2>
		);
	}

	return (
		<div className="page">

			<div className="display-container properties">
				<ul className="properties-list">
					{properties?.map(property => {
						return (
							<li key={property._id} className="property-container">
								<Property {...property}/>
							</li>
						)
					})}
				</ul>
			</div>


			<PropertyForm />
		</div>
	);
};

export default Properties;