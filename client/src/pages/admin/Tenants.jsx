import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useEffect } from "react";
import { Expense } from "../../components/index.js";

const Tenants = () => {

	const { tenants, readTenants } = useGlobalContext()

	useEffect(() => {
		readTenants()
	}, [])

	return (
		<div className="tenants-page">
			<div className="title">Tenants</div>

			<div className="grid grid-cols-3 mb-4 pt-3 justify-items-start border-t-2 ">
				{tenants?.map(tenant => {
					return (
						<div key={tenant._id} className="">
							<div>
								{tenant.lastName}
							</div>
							<div>
								{tenant.firstName}
							</div>
							<div>
								{tenant.phone}
							</div>
							<div>
								{tenant.email}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default Tenants;