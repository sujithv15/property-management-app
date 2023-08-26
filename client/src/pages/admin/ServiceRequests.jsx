import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import { FaExclamation } from "react-icons/fa"
import { IoMailUnreadOutline } from "react-icons/io5";
const ServiceRequests = () => {

	const { requests, getServiceRequests } = useGlobalContext()

	useEffect(() => {
		getServiceRequests()
	}, [])

	const [filter, setFilter] = useState("Pending")

	const filteredRequests = requests.filter(request => request.status === filter)

	return (
		<div className="requests-page">
			<div className="title border-b-2 mx-auto">Service Requests</div>
			<div className="p-8">
				<label className="text-base" htmlFor="status">Filter Messages: </label>
				<select className="form-select max-w-xs" name="status" value={filter} onChange={(e)=>setFilter(e.target.value)}>
					<option>Pending</option>
					<option>Completed</option>
					<option>In Progress</option>
				</select>
			</div>
			<div className="requests sm:mx-8">
				{
					filteredRequests.map(request => {
						return (
							<div key={request.title} className="request h-28 p-1 relative">

								{
									request.urgent &&
									<FaExclamation className="absolute rounded-3xl top-0 bottom-0 left-10 my-auto"/>
								}


								<div className="max-w-2xl mx-auto mx-8 px-20 p-1">
									<div className="text-sm">{request?.createdAt?.substring(0, 10)}</div>
									<div className="text-lg">{request?.unit?.unitID} {request?.unit?.street}</div>
									<div className="text-xl font-bold">{request.title}</div>
									<div className="text-sm font-light truncate hover:cursor-pointer text-ellipsis">{request.description}</div>
								</div>
							</div>
						)
					})
				}
			</div>

		</div>
	);
};

export default ServiceRequests;