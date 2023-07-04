import {NavLink} from "react-router-dom";
import {Tenant} from "./index.js";
import {useState} from "react";
import TenantForm from "./forms/TenantForm.jsx";


const Unit = (unit) => {

	const { property, address, bedrooms, bathrooms, tenant, rent, fmrRent, appliances, repairs } = unit

	const [showUnit, setShowUnit] = useState(false)
	const [showTenant, setShowTenant] = useState(false)
	const [showForm, setShowForm] = useState(false)

	const getTenantDetails = () => {

	}
	const getUnitDetails = () => {

	}

	return (
		<div className="unit-container">
			<div className="unit-info">

				<div className="unit-street unit-item">
					<a onClick={getUnitDetails} style={{cursor: 'pointer'}}>{address?.street}</a>
				</div>

				<div className="unit-type unit-item">
					<p>{bedrooms}br/ {bathrooms}ba</p>
				</div>

				<div className="unit-tenant unit-item">
					<a onClick={()=>setShowTenant(!showTenant)} style={{cursor: 'pointer'}}>{tenant?.lastName}, {tenant?.firstName}</a>
					<div className="unit-tenant-info">
						{showTenant && <Tenant {...tenant}/>}
					</div>
				</div>

				<div className="unit-rent unit-item">
					<p>{rent}</p>
				</div>

				<div className="unit-add-tenant unit-item">
					{tenant ?
						<button className="btn" onClick={() => setShowForm(!showForm)}>edit tenant</button>
					:
						<button className="btn" onClick={() => setShowForm(!showForm)}>add tenant</button>
					}
				</div>

				<div className="unit-appliances unit-item">
						<button className="btn" onClick={() => setShowForm(!showForm)}>view/edit appliances</button>
				</div>

			</div>

			<div className="add-tenant-form">
				{showForm && <TenantForm />}
			</div>
		</div>
	);
};

export default Unit;