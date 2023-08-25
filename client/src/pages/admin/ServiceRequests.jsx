import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useEffect } from "react";

const ServiceRequests = () => {

	const { requests, getServiceRequests } = useGlobalContext()

	useEffect(() => {
		getServiceRequests()
	}, [])

	return (
		<div className="requests-page">
			<div className="title border-b-2">Service Requests</div>
			{
				requests?.map(request => {
					return (
						<div key={request.title} className="max-w-2xl mx-auto m-8 p-4 text-lg border-4">
							<div className="m-1">{request.createdAt.substring(0, 10)}</div>
							<div className="m-1">Unit: {request.unit.unitID} {request.unit.street}</div>
							<div className="m-1 font-bold">Title: {request.title}</div>
							<div className="m-1 mx-6">Description: {request.description}</div>
						</div>
					)
				})
			}


		</div>
	);
};

export default ServiceRequests;