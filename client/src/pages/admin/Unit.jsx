import ax from '../../utils/ax.jsx'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Tenant, Appliance, Payment } from "../../components/index.js";
import UnitUpdateForm from "../../components/forms/UnitUpdateForm.jsx";
import TenantUpdateForm from "../../components/forms/TenantUpdateForm.jsx";
import TenantCreateForm from "../../components/forms/TenantCreateForm.jsx";
import App from "../../App.jsx";
import ApplianceCreateForm from "../../components/forms/ApplianceCreateForm.jsx";

const Unit = () => {

	const unit_id = useParams().id

	const [unit, setUnit] = useState({})
	const [showUnitUpdateForm, setShowUnitUpdateForm] = useState(false)

	const [tenant, setTenant] = useState(null)
	const [showTenantDetails, setShowTenantDetails] = useState(false)
	const [showCreateTenantForm, setShowCreateTenantForm] = useState(false)


	const [appliances, setAppliances] = useState([])
	const [showAppliances, setShowAppliances] = useState(false)
	const [showCreateApplianceForm, setShowCreateApplianceForm] = useState(false)
	const [showApplianceUpdateForm, setShowApplianceUpdateForm] = useState(false)

	const [mortgage, setMortgage] = useState({})

	const [payments, setPayments] = useState([])


	// get unit details, populated with tenant details and appliances array
	const fetchAndSetUnit = async () => {
		try {
			const response = await ax(`/admin/units/${unit_id}`)
			const { unit } = response.data
			const { tenant, appliances, mortgage, payments } = unit
			setTenant(tenant)
			setAppliances(appliances)
			setUnit(unit)
			setMortgage(mortgage)
			setPayments(payments)
		} catch (error) {
			throw Error(error)
		}
	}

	useEffect(() => {
		fetchAndSetUnit()
	}, [])

	const togglePrimary = () => {
		console.log('toggling primary unit status...');
	}


	return (
		<div className="grid mb-4 pt-3 justify-items-start border-t-2 ml-10 gap-4">


			<div className="address">
				Address:
				<p>{unit.propertyUnit} {unit.street}</p>
				<p> {unit.city}, {unit.state} {unit.zip}</p>
			</div>
			<div className="unit-type">
				Bedrooms/Bathrooms:
				<p>{unit?.bedrooms}br/ {unit?.bathrooms}ba</p>
			</div>

			<div className="unit-rent">
				Rent:
				<p>${unit?.rent}</p>
				Fair market Rent:
				<p>Market rent: ${unit?.fmrRent}</p>
			</div>

			<div className="unit-occupied">
				Occupied:
				<p>{unit?.isOccupied ? 'Yes' : 'No'}</p>
			</div>

			{
				unit.isPrimary &&

				<div className="primary-unit-details">
					<div className="unit-mortgage">
						<p>Mortgage Bank: {mortgage.bank}</p>
						<p>total loan amonut: {mortgage.loanAmount}</p>
						<p>balance: {mortgage.balance}</p>
						<p>interest: {mortgage.interest}</p>
						<p>monthly payment: {mortgage.payment}</p>
					</div>
				</div>
			}

			<div className="payments">
				{
					payments?.map(payment => {
						return (
							<Payment key={payment._id} {...payment}/>
						)
					})
				}
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
									<Tenant {...tenant}/>
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

			<div className="unit-details-appliances">
				<a  className="text-blue-600" onClick={
					()=>setShowAppliances(!showAppliances)}
				>
					Appliances
				</a>
				{
					showAppliances && appliances &&
					<>
						{
							appliances.map(appliance => {
								return (
									<div key={appliance._id}>
										<Appliance {...appliance} />
									</div>
								)
							})
						}
					</>
				}
				<div>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={()=>setShowCreateApplianceForm(!showCreateApplianceForm)}>{showCreateApplianceForm ? "cancel" : "add appliance"}</button>
				</div>

			</div>

			<div className="unit-update-btn">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={() => setShowUnitUpdateForm(!showUnitUpdateForm)
					}>
					{showUnitUpdateForm ? "cancel" : "edit unit"}
				</button>
			</div>

			<div className="make-primary">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={togglePrimary}
					>
					{unit.isPrimary ? "remove primary" : "make primary"}
				</button>
			</div>

			<div className="appliance-form">
				{showCreateApplianceForm && <ApplianceCreateForm />}
			</div>

			<div className="unit-form">
				{showUnitUpdateForm && <UnitUpdateForm {...unit}/>}
			</div>

			<div className="tenant-form">
				{showCreateTenantForm && <TenantCreateForm />}
			</div>

		</div>
	);
};

export default Unit;