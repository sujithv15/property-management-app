import { ax } from '../../utils/ax.jsx'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TenantUnit, AppliancesUnit, AccountingUnit } from "../../components/unit-components"
import { UnitUpdateForm, TenantCreateForm, FileUploadForm } from "../../components/forms";
import { Expense } from "../../components/index.js";
import { useGlobalContext } from "../../context/GlobalContext.jsx";

const Unit = () => {
	// react router- _id passed as params
	const unit_id = useParams().id

	const { getUnitDetails, unit, tenant, appliances, expenses } = useGlobalContext()

	// get unit details and populate tenant, appliances, expenses (global states)
	useEffect(() => {
		getUnitDetails(unit_id)
	}, [])

	const [showUnitUpdateForm, setShowUnitUpdateForm] = useState(false)
	const [showImageForm, setShowImageForm] = useState(false)
	const [showCreateTenantForm, setShowCreateTenantForm] = useState(false)

	return (
		<div>
			<div className="flex flex-col ">
				<div>
					{
						unit.image &&
						<div className="relative overflow-hidden h-48">
							<img
								className="absolute w-full"
								src={unit.image}
								alt="img"
								width="240px"
							/>

						</div>
					}

				</div>
				<div className="text-center">
					<h2 className="text-center my-12 text-2xl">{unit.unitID} {unit.street}</h2>
				</div>

				{/*----------------Unit Details-----------------*/}

				<div className=" grid grid-cols-5 justify-items-left border-t-2 pt-16 my-4" >
					<p className="text-xl font-bold">Address</p>
					<p className="text-xl font-bold">Beds/Baths</p>
					<p className="text-xl font-bold">Rent</p>
					<p className="text-xl font-bold">Fair Market Rent</p>
				</div>

				<div className="grid grid-cols-5 justify-items-left mb-16" >
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

					<div className="flex flex-col gap-4 w-24 mx-auto">
						<button
							className="btn"
							onClick={() => setShowUnitUpdateForm(true)
							}>
							edit unit
						</button>
						<button
							className="btn"
							onClick={() => setShowImageForm(!showImageForm)
							}>
							edit image
						</button>
					</div>

				</div>

				<div>
						{/*Update Unit*/}
					<div className="unit-update-forms">

						{showImageForm &&
							<FileUploadForm unit_id={unit._id} setShowImageForm={setShowImageForm} />}

						{showUnitUpdateForm &&
							<UnitUpdateForm setShowUnitUpdateForm={setShowUnitUpdateForm} />}
					</div>
				</div>

				{/*----------------Tenant-----------------*/}
				<div className="unit-tenant pt-8 border-t-2">
					{
						// if tenant, render component
						// else render create tenant button
						tenant ?
							<div className="tenant-info">
								<TenantUnit />
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
						<AppliancesUnit unit_id={unit_id} />
					</div>


			</div>
		</div>

	);
};

export default Unit;