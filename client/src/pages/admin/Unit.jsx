import { ax } from '../../utils/ax.jsx'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TenantUnit, AppliancesUnit, AccountingUnit } from "../../components/unit-components"
import { UnitUpdateForm, TenantCreateForm } from "../../components/forms";

const Unit = () => {

	const unit_id = useParams().id

	const [unit, setUnit] = useState({})

	const [showUnitUpdateForm, setShowUnitUpdateForm] = useState(false)

	const [tenant, setTenant] = useState(null)
	const [showCreateTenantForm, setShowCreateTenantForm] = useState(false)


	const [appliances, setAppliances] = useState([])


	const [payments, setPayments] = useState([])


	// get unit details, populated with tenant details, appliances array, mortgage, and payments array
	// set properties of unit to local state, so they can be updated or deleted
	const fetchAndSetUnit = async () => {
		try {
			const response = await ax(`/admin/units/${unit_id}`)
			const { unit } = response.data
			const { tenant, appliances, expenses } = unit
			setUnit(unit)
			setTenant(tenant)
			setAppliances(appliances)
			//if (mortgage) setMortgage(mortgage)
			//if (payments) setPayments(payments)
		} catch (error) {
			throw Error(error)
		}
	}

	useEffect(() => {
		fetchAndSetUnit()
	}, [])




	return (
		<div>

			<div className="text-center">
				<h2 className="text-center m-5 text-2xl">{unit.unitID} {unit.street}</h2>
			</div>

			<div className="grid grid-cols-5 mb-4 pt-3 justify-items-start border-t-2 ml-10">

				<div className="col-span-2">
					<p>{`${unit.unitID} ${unit.street}`}</p>
					<p>{unit.city}, {unit.state} {unit.zip}</p>
				</div>

				<div className="unit-type">
					<p>{unit.bedrooms}br/ {unit.bathrooms}ba</p>
				</div>

				<div className="unit-rent">
					<p>${unit.rent}</p>
				</div>

				<div className="unit-occupied">
					<p>{unit.occcupied ? 'Yes' : 'No'}</p>
				</div>
			</div>

			{/*----------------Tenant-----------------*/}

			<div className="grid mb-4 pt-3 justify-items-start border-t-2 ml-10 gap-4">

				<div className="unit-tenant">
					{
						tenant ?
							<div className="tenant-info">
								<TenantUnit {...tenant}/>
							</div>
							:
							<div className="tenant-form">
								<button
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
									onClick={() => setShowCreateTenantForm(!showCreateTenantForm)}>
									add tenant
								</button>
								{showCreateTenantForm && <TenantCreateForm setShowCreateTenantForm={setShowCreateTenantForm} tenant={{tenant}}/>}
							</div>
					}
				</div>


				<div className="unit-rent">
					Fair market Rent: ${unit?.fmrRent}
				</div>


				{/*----------------Payments-----------------*/}
				<div className="payments">
					{
						payments?.map(payment => {
							return (
								<Payment key={payment._id} {...payment}/>
							)
						})
					}
				</div>


				{/*----------------Appliances-----------------*/}
				<div className="unit-details-appliances">
					<p className="">Appliances</p>
					<AppliancesUnit {...unit}/>
				</div>


				{/*----------------Update Unit-----------------*/}
				<div className="unit-update-btn">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
						onClick={() => setShowUnitUpdateForm(true)
						}>
						edit unit
					</button>
					{showUnitUpdateForm &&
						<UnitUpdateForm
							unit={unit}
							setShowUnitUpdateForm={setShowUnitUpdateForm}
							fetchAndSetUnit={fetchAndSetUnit}
						/>}
				</div>




			</div>
		</div>
	);
};

export default Unit;