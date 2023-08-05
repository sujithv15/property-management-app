import {useState} from "react";
import TenantCreateForm from "./forms/TenantCreateForm.jsx";

import { NavLink } from "react-router-dom";


const UnitDetails = (unit) => {

	const { _id, unitID, street, city, state, zip, isPrimary, occupied, tenant, user, bedrooms, bathrooms, rent, fmrRent, appliances } = unit

	const [id, setId] = useState(_id)



	return (
		<div className="">
			<div className="grid grid-cols-5 mb-4 pt-3 justify-items-start border-t-2">

				<div className="col-span-2">
						<p>
							<NavLink className="pl-3 text-blue-600" to={`/admin/units/${id}`}>{`${unitID} ${street}`}</NavLink>
						</p>
						<p className="pl-3">{city}, {state} {zip}</p>
				</div>

				<div className="unit-type">
					<p>{bedrooms}br/ {bathrooms}ba</p>
				</div>

				<div className="unit-rent">
					<p>${rent}</p>
				</div>

				<div className="unit-occupied">
					{unit.tenant !== null ? 'Yes' : 'No'}
				</div>
			</div>


		</div>
	);
};

export default UnitDetails;