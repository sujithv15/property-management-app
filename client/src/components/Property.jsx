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
					<div className="address-line-1">
						<span>{address.street}</span>
						<span>{address.streetOptions}</span>
					</div>
					<div className="address-line-2">
						<span>{address.city}, </span>
						<span>{address.state} </span>
						<span>{address.zip}</span>
					</div>
				</div>

				<div className="property-numUnits">
					{units.length}
				</div>

				<div className="property-numVacant">

				</div>

				<div className="numRequests">

				</div>

			</div>

		</div>
	);
};

export default Property;