import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { TenantUnit } from "../../components/unit-components/index.js";
import { useEffect } from "react";

const UserDashboard = () => {

	const { user, getUserAccessibleDetails, messages, unreadMessageCount, unit, tenant } = useGlobalContext()

	useEffect(() => {
		getUserAccessibleDetails(user)
	}, [])

	return (
		<div className="user-dashboard">
			<div className="title border-b-2 mx-8">Dashboard</div>
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

				<div className="new-messages">
					<div className="text-center text-xl py-8">New Messages</div>
					<div className="text-sm font-bold text-center mb-5 p-2 ">{`You have ${unreadMessageCount} new message${unreadMessageCount === 1 ? '' : 's'}!`}</div>
				</div>

				<div className="my-2 mx-auto">
					<p className="text-4xl text-center">{`${unit.unitID} ${unit.street}`}</p>
					<p className="text-center">{unit.city}, {unit.state} {unit.zip}</p>
				</div>

				<div className="unit-type mx-auto my-2 text-lg">
					<p>{unit.bedrooms}br/ {unit.bathrooms}ba</p>
				</div>

				<div className="m-4 flex flex-col gap-2">
					<p className="flex justify-center gap-6 text-xl font-bold">Current Rent: <span> ${unit.rent}</span></p>

				</div>
			</div>

			<div className="text-md text-center mb-5 p-4 "> Welcome {user.firstName} {user.lastName}. You have 0 new messages!</div>

			{
				tenant.balance > 0 &&
				<div className="text-md font-bold text-center mb-5 p-2 ">
					{`You have a balance of ${tenant.balance}. Please pay this immediately to avoid charges.`}
				</div>
			}


			<div className="border-t-2 py-4">

			</div>

			<div className="tenant-info">
				<TenantUnit tenant={tenant}/>
			</div>
		</div>
	);
};

export default UserDashboard;