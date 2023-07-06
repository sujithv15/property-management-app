import {useGlobalContext} from "../../context/GlobalContext";
import {useState, useEffect} from "react";
import PropertyForm from "../../components/forms/PropertyForm.jsx";
import {Loading} from "../../components/index.js";
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


	return (
		<div className="properties-page page">

			<div className="section-header">
				<h2>Properties</h2>
			</div>

			<div className="properties-container">
				<ul className="properties-list">
					{properties?.map(property => {
						return (
							<li key={property._id}>
								<Property {...property}/>
							</li>
						)
					})}
				</ul>
			</div>

			<div className="property-form">
				{showForm ?
					<PropertyForm />
					:
					<button className="btn" onClick={() => setShowForm(!showForm)}>add property</button>
				}
			</div>

		</div>
	);
};

export default Properties;