import { useGlobalContext } from "../../context/GlobalContext.jsx";


const AdminDashboard = () => {

	const { user } = useGlobalContext()

	return (
		<div className="">

			<div className="text-lg text-center mt-4">Welcome {user.email}!</div>

			<div className="text-sm text-center mb-5">You have ___ new alerts!</div>

			<div className="">new messages</div>

			<div className="">new requests</div>

			<div className="">upcoming payments</div>

			<div className="">rents for this month</div>

		</div>
	);
};

export default AdminDashboard;