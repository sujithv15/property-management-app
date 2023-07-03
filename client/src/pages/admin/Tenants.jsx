import {Tenant} from "../../components/index.jsx";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {useEffect} from "react";
import {Loading} from "../../components/index.jsx";
import TenantForm from "../../components/forms/TenantForm.jsx";


const Tenants = () => {


	const { isLoading, readTenants, tenants } = useGlobalContext()

	useEffect(() => {
		readTenants()
	}, [])

	if (isLoading) {
		return <Loading center />;
	}
	if (tenants.length === 0) {
		return (
			<h2>No tenants to display...</h2>
		);
	}
	return (
		<div className="page">
			<h2>Tenants</h2>

			<div className="display-container tenants">
				{tenants?.map(tenant => {
					return (
						<div key={tenant._id} className="tenant-container">
							<Tenant {...tenant}/>
						</div>
					)
				})}
			</div>

			<TenantForm />

		</div>
	);
};

export default Tenants;