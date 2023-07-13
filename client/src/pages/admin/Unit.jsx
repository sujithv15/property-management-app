import ax from '../../utils/ax.jsx'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Tenant } from "../../components/index.js";
import UnitUpdateForm from "../../components/forms/UnitUpdateForm.jsx";
import TenantUpdateForm from "../../components/forms/TenantUpdateForm.jsx";
import TenantCreateForm from "../../components/forms/TenantCreateForm.jsx";

const Unit = () => {

	const unit_id = useParams().id

	const [unit, setUnit] = useState({})
	const [showUnitUpdateForm, setShowUnitUpdateForm] = useState(false)

	const [tenant, setTenant] = useState(null)
	const [showTenantDetails, setShowTenantDetails] = useState(false)
	const [showCreateTenantForm, setShowCreateTenantForm] = useState(false)
	const [showTenantUpdateForm, setShowTenantUpdateForm] = useState(false)

	const [showAppliances, setShowAppliances] = useState(false)


	// get unit details, populated with tenant details
	const fetchAndSetUnit = async () => {
		try {
			const response = await ax(`/admin/units/${unit_id}`)
			const { unit } = response.data
			const { tenant } = unit
			setTenant(tenant)
			setUnit(unit)
		} catch (error) {
			throw Error(error)
		}
	}

	useEffect(() => {
		fetchAndSetUnit()
	}, [])


	return (
		<div className="">

			<div className="grid grid-cols-5 mb-4 pt-3 justify-items-start border-t-2 ml-10">

				<div className="unit-type">
					<p>{unit?.bedrooms}br/ {unit?.bathrooms}ba</p>
				</div>

				<div className="unit-rent">
					<p>${unit?.rent}</p>
				</div>

				<div className="unit-occupied">
					{unit?.isOccupied ? 'Yes' : 'No'}
				</div>
			</div>

			<div className="unit-tenant">
				{
					tenant ?
						<div className="tenant-info">
							<p>Tenant: </p>
							<p>{tenant.firstName} {tenant.lastName}</p>
							<div className="tenant-contact">
								<p>{tenant.phone}</p>
								<p>{tenant.email}</p>
							</div>
							<div className="tenant-details">
								<a onClick={
									()=>setShowTenantDetails(!showTenantDetails)}
								>
									<Tenant />
								</a>
							</div>
						</div>
						:
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
							onClick={() => setShowCreateTenantForm(!showCreateTenantForm)
							}>{showCreateTenantForm ? "cancel" : "add tenant"}
						</button>
				}
			</div>


			<div className="text-center">
				<h2 className="text-center m-5 text-2xl">Units</h2>
			</div>

			<div className="unit-details-rent">
				<p>Rent: ${unit?.rent}</p>
				<p>Market rent: ${unit?.fmrRent}</p>
			</div>

			<div className="unit-details-appliances">
				<a onClick={
					()=>setShowAppliances(!showAppliances)}
				>
					Appliances
				</a>
				{
					showAppliances &&
					<>
						<p>Refrigerator:</p>
						<p>Stove:</p>
						<p>Microwave:</p>
						<p>Washer</p>
						<p>Dryer</p>
						<p>HVAC</p>
						<p>Water heater</p>
					</>
				}
			</div>

			<div className="unit-update-btn">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={() => setShowUnitUpdateForm(!showUnitUpdateForm)
					}>
					{showUnitUpdateForm ? "cancel" : "edit unit"}
				</button>
			</div>

			{tenant &&
				<button
					className="edit-tenant btn"
					onClick={() => setShowTenantUpdateForm(!showTenantUpdateForm)
					}>
					{showTenantUpdateForm ? "cancel" : "edit tenant"}
				</button>
			}

			<div className="unit-form">
				{showUnitUpdateForm && <UnitUpdateForm {...unit}/>}
			</div>
			<div className="tenant-form">
				{showTenantUpdateForm && <TenantUpdateForm {...tenant}/>}
				{showCreateTenantForm && <TenantCreateForm />}
			</div>

		</div>
	);
};

export default Unit;