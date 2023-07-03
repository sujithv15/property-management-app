import {useGlobalContext} from "../context/GlobalContext.jsx";
import {NavLink} from "react-router-dom";

const Property = (property) => {

	const { _id, propertyID, address, units } = property

	return (
		<div>
			<div className="property-info">
				<div className="property-id">
					<h5>{propertyID}</h5>
				</div>
				<div className="property-address">
					<h5>{address.street}</h5>
					<h5>{address.streetOptions}</h5>
					<h5>{address.city}</h5>
					<h5>{address.state}</h5>
					<h5>{address.zip}</h5>
				</div>
			</div>
			<div className="property-units">
				<h5>{units}</h5>
			</div>
		</div>
	);
};

export default Property;