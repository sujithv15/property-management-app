import {useState} from "react";
import { NavLink } from "react-router-dom";
import { BiMailSend } from "react-icons/bi"
import { CreateMessageForm } from "./forms/index.js";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const UnitDetails = (unit) => {

	const { _id, unitID, street, city, state, zip,bedrooms, bathrooms, rent} = unit

	const { users } = useGlobalContext()

	const [showComposeMessage, setShowComposeMessage] = useState(false)

	return (
			<div className="grid grid-cols-4 sm:grid-cols-6 mb-4 pt-3 justify-items-start border-t-2 h-24 overflow-hidden">

				<div className="unit-img my-auto">
					<img src={unit.image} alt="img"/>
				</div>

				<div className="col-span-2 items-center">

					<NavLink className="pl-3 text-blue-600 text-base sm:text-xl truncate" to={`/admin/units/${_id}`}>{`${unitID} ${street}`}</NavLink>
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

				<div
					className="unit-rent hover:cursor-pointer"
					onClick={()=>setShowComposeMessage(true)}
				>
					<BiMailSend />
				</div>

				{showComposeMessage &&
					<CreateMessageForm
						setShowComposeMessage={setShowComposeMessage}
						recipient={users.find(user => user.unit === _id).email}
						users={users}
					/>}


			</div>

	);
};

export default UnitDetails;