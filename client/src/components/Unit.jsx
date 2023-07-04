import {NavLink} from "react-router-dom";

const Unit = (unit) => {

	const { property, address, status, tenant, unitID, rent, fmrRent, appliances, repairs } = unit

	console.log(tenant?.lastName);
	//  <NavLink to={adminLink.url} className="nav-link">{adminLink.name}</NavLink>
	return (
		<div className="unit-container">
			<div className="unit-info">

				<div className="unit-street">
					<NavLink to="/" className="nav-link">{address.street}</NavLink>
				</div>

				<div className="status">
					<p>{status}</p>
				</div>

			</div>
		</div>
	);
};

export default Unit;