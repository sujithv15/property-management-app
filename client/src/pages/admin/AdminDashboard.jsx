import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// do not display
const AdminDashboard = () => {

	const navigate = useNavigate()

	const { readUnits, readExpenses, getMessages, getServiceRequests, unreadMessageCount } = useGlobalContext()

	// navigate to units summary until construction complete
	useEffect(() => {
		readUnits()
		readExpenses()
		getMessages()
		getServiceRequests()
	}, [])
;
	return (
		<div className="admin-dashboard">

			<div className="title border-b-2 mx-8">Administrator Dashboard</div>

			<div className="new-messages">
				<div className="text-center text-xl py-3">New Messages</div>
				<div className="text-sm font-bold text-center mb-1 p-2 ">{`You have ${unreadMessageCount} new message${unreadMessageCount === 1 ? '' : 's'}!`}</div>
			</div>


			<div className="new-requests">
				<div className="text-center text-xl py-4">Pending Requests</div>

			</div>


			<div className="border-t-2 ">




				<div className="">upcoming payments</div>

				<div className="">rents for this month</div>
			</div>
		</div>
	);
};

export default AdminDashboard;