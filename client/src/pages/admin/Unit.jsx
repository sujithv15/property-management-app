import { ax } from '../../utils/ax.jsx'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TenantUnit, AppliancesUnit, AccountingUnit } from "../../components/unit-components"
import { UnitUpdateForm, TenantCreateForm } from "../../components/forms";
import { Expense } from "../../components/index.js";

const Unit = () => {

	const unit_id = useParams().id

	const [unit, setUnit] = useState({})

	const [showUnitUpdateForm, setShowUnitUpdateForm] = useState(false)

	const [tenant, setTenant] = useState(null)
	const [showCreateTenantForm, setShowCreateTenantForm] = useState(false)


	const [appliances, setAppliances] = useState([])


	const [expenses, setExpenses] = useState([])


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
			<div className="flex flex-col ">
				<div className="text-center">
					<h2 className="text-center my-12 text-2xl">{unit.unitID} {unit.street}</h2>
				</div>

				{/*----------------Unit Details-----------------*/}

				<div className=" grid grid-cols-5 justify-items-center border-t-2 pt-16 my-4" >
					<p className="text-xl font-bold">Address</p>
					<p className="text-xl font-bold">Beds/Baths</p>
					<p className="text-xl font-bold">Rent</p>
					<p className="text-xl font-bold">Fair Market Rent</p>
				</div>

				<div className="grid grid-cols-5 justify-items-center mb-16" >
					<div className="">
						<p>{`${unit.unitID} ${unit.street}`}</p>
						<p>{unit.city}, {unit.state} {unit.zip}</p>
					</div>

					<div className="unit-type">
						<p>{unit.bedrooms}br/ {unit.bathrooms}ba</p>
					</div>

					<div className="unit-rent">
						<p>${unit.rent}</p>
					</div>

					<div className="unit-rent">
						${unit?.fmrRent}
					</div>
					<div>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
							onClick={() => setShowUnitUpdateForm(true)
							}>
							edit unit
						</button>
					</div>

				</div>

				<div>
						{/*Update Unit*/}
					<div className="unit-update-btn">

						{showUnitUpdateForm &&
							<UnitUpdateForm
								unit={unit}
								setShowUnitUpdateForm={setShowUnitUpdateForm}
								fetchAndSetUnit={fetchAndSetUnit}
							/>}
					</div>
				</div>

				{/*----------------Tenant-----------------*/}
				<div className="unit-tenant pt-8 border-t-2">
					{
						// if tenant, render component
						// else render create tenant button
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

								{showCreateTenantForm &&
									<TenantCreateForm
										setShowCreateTenantForm={setShowCreateTenantForm}
										unit_id={unit_id}
									/>}
							</div>
					}
				</div>

				{/*----------------Appliances-----------------*/}
				<div className="appliances py-8 border-t-2 ">
					<AppliancesUnit {...unit}/>
				</div>


				{/*----------------Expenses-----------------*/}
				<div className="expenses pt-8 border-t-2">
					{
						expenses?.map(expense => {
							return (
								<Expense key={expense._id} {...expenses}/>
							)
						})
					}
				</div>
			</div>
		</div>

	);
};

export default Unit;