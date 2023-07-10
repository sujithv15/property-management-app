import { useState } from "react";
import Unit from "./Unit.jsx";
import {NavLink} from "react-router-dom";
import UnitForm from "./forms/UnitForm.jsx";

const Property = (property) => {


	const { _id, street, city, state, zip, units } = property

	const [showUnits, setShowUnits] = useState(false)
	const [showForm, setShowForm] = useState(false)

	return (
		<div className="property-container">
			<div className="property-info">

				<div className="property-address">
					<div className="property-address-1">
						<a onClick={() => setShowUnits(!showUnits)} style={{cursor: 'pointer'}}>
						<span>{street}</span>
						</a>
					</div>
					<div className="property-address-2">
							<span>{city}, </span>
							<span>{state} </span>
							<span>{zip}</span>
					</div>
				</div>

				<div className="unit-form">
					{showUnits && 	<button className="btn" onClick={() => setShowForm(!showForm)}>add unit</button>}
					{showForm && <UnitForm _id={_id}/>}
				</div>

				<div className="unit-alerts"></div>
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