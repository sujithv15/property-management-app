import Property from "../../components/Property.jsx";
import Unit from "../../components/Unit.jsx";

const PropertyDetails = (property) => {

	const { units } = property

	return (
		<div>
			<ul className="units-list">
				{units?.map(unit => {
					return (
						<li key={unit._id} className="unit-container">
							<Unit {...unit}/>
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default PropertyDetails;