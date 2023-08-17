import {useState} from "react";
import { NavLink } from "react-router-dom";


const UnitDetails = (unit) => {

	const { _id, unitID, street, city, state, zip, isPrimary, occupied, tenant, user, bedrooms, bathrooms, rent, fmrRent, appliances } = unit

	const [id, setId] = useState(_id)



	return (
			<page className="grid grid-cols-3 sm:grid-cols-5 mb-4 pt-3 justify-items-start border-t-2 h-24 overflow-hidden">

				<div className="unit-img my-auto">
					<img src={unit.image} alt="img"/>
				</div>

				<div className="col-span-2 items-center">

					<NavLink className="pl-3 text-blue-600 text-base sm:text-xl truncate" to={`/admin/units/${id}`}>{`${unitID} ${street}`}</NavLink>

					<p className="pl-3 text-base">{city}, {state} <span className="hidden sm:inline-block">{zip}</span></p>

					<div className="unit-rent pl-3 text-base block sm:hidden">
						<p>${rent}</p>
					</div>

				</div>

				<div className="unit-type hidden sm:block">
					<p>{bedrooms}br/ {bathrooms}ba</p>
				</div>

				<div className="unit-rent hidden sm:inline-block">
					<p>${rent}</p>
				</div>
			</page>

	);
};

export default UnitDetails;