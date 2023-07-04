import {useGlobalContext} from "../../context/GlobalContext";
import {useState, useEffect} from "react";
import PropertyForm from "../../components/forms/PropertyForm.jsx";
import {Loading} from "../../components/index.jsx";
import Property from "../../components/Property.jsx";


const Properties = () => {

	const { readProperties, isLoading, properties } = useGlobalContext()

	const [showForm, setShowForm] = useState(false)

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

			{showForm ?
				<PropertyForm />
				:
				<button className="btn" onClick={() => setShowForm(!showForm)}>add property</button>
			}

		</div>
	);
};

export default Properties;