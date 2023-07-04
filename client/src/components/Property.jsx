import { useState } from "react";
import Unit from "./Unit.jsx";
import {NavLink} from "react-router-dom";


const Property = (property) => {


	const { _id, address, units, numUnitsVacant } = property

	const [showUnits, setShowUnits] = useState(false)


	return (
		<div className="property-container">
			<div className="property-info">

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
					{showUnits ?
						<button className="btn" onClick={() => setShowUnits(false)}>hide units</button>
						:
						<button className="btn" onClick={() => setShowUnits(true)}>show units</button>
					}
				</div>


				<div className="property-numVacant">
					<p>{numUnitsVacant}</p>
				</div>

				<div className="numRequests">

				</div>

			</div>
			<div className="property-details">
				{showUnits && units.map(unit => {
					return (
						<div key={unit._id}><Unit {...unit} /></div>
					)
				})}
			</div>

		</div>
	);
};

export default Property;