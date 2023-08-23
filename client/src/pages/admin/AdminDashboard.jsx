import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// do not display
const AdminDashboard = () => {

	const navigate = useNavigate()

	// navigate to units summary until construction complete
	useEffect(() => {
		navigate('/admin/units')
	}, [])
;
	return (
		<div className="pb-20">

			<div className="">
				<div className="text-center py-5 text-5xl ">Administrator Home</div>
				<div className="text-sm font-bold text-center mb-5 p-2 ">You have ___ new alerts!</div>
			</div>

			<div className="border-t-2 ">
				<div className="">new messages</div>

				<div className="">new requests</div>

				<div className="">upcoming payments</div>

				<div className="">rents for this month</div>
			</div>
		</div>
	);
};

export default AdminDashboard;