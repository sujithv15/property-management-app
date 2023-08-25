import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import { Expense } from "../../components/index.js";

const Tenants = () => {

	const { tenants, readTenants } = useGlobalContext()

	useEffect(() => {
		readTenants()
	}, [])

	// state for search function
	const [query, setQuery] = useState("")

	// filter tenants by search by using derived state;
	// -convert query to lower case and check if any part of the tenant's name
	const queriedTenants = tenants.filter(tenant => {
		return (
			tenant.lastName.toLowerCase().includes(query.toLowerCase())  ||
			tenant.firstName.toLowerCase().includes(query.toLowerCase())
		)
	})
	return (
		<div className="tenants-page">
			<div className="title">Tenants</div>

			<div className="border-t-2">
				<div className="flex gap-2 my-8 sm:my-16">
					<input
						className="form-input mx-16 h-10"
						type="search" placeholder="Search Tenants"
						value={query} onChange={e=>setQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				{queriedTenants?.map(tenant => {
					return (
						<div key={tenant._id} className="flex-col sm:flex ">
							<div className="text-lg sm:text-2xl font-bold">
								{tenant.lastName}, {tenant.firstName}
							</div>
							<div className="text-sm sm:text-xl">
								{tenant.phone}
							</div>
							<div className="text-sm sm:text-xl">
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