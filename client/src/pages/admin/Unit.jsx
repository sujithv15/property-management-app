import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TenantUnit, AppliancesUnit } from "../../components/unit-components"
import { UnitUpdateForm, TenantCreateForm, FileUploadForm } from "../../components/forms";
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

				{/*----------------Unit Image & Details-----------------*/}
				<div className="flex flex-col border-b-4">
					{
						unit.image &&
						<div className="overflow-hidden my-8">
							<img
								className=""
								src={unit.image}
								alt="img"
								width="240px"
							/>
						</div>
					}

					<div className="my-8 mx-auto">
						<p className="text-4xl text-center">{`${unit.unitID} ${unit.street}`}</p>
						<p className="text-center">{unit.city}, {unit.state} {unit.zip}</p>
					</div>

					<div className="unit-type mx-auto my-4 text-lg">
						<p>{unit.bedrooms}br/ {unit.bathrooms}ba</p>
					</div>

					<div className="m-8 flex flex-col gap-2">
						<p className="flex justify-center gap-6 text-xl font-bold">Current Rent: <span> ${unit.rent}</span></p>
						<p className="flex justify-center gap-4 text-xl font-bold">Fair Market Rent: <span> ${unit?.fmrRent || "N/A"}</span></p>
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
				<div className="unit-tenant pt-8">
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


				<div className="flex justify-center gap-4 border-t-4 pt-6">
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
		</div>

	);
};

export default Unit;