import ModalWrapper from "./forms/ModalWrapper.jsx";
import { GrClose } from "react-icons/gr"
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { RiReplyFill } from "react-icons/ri"
import { CreateMessageForm } from "./forms"
import { useEffect, useState } from "react";

const ServiceRequest = ({ serviceRequest, setShowServiceRequest }) => {

	const { user } = useGlobalContext()

	return (
		<ModalWrapper>

			<div className="modal-msg max-w-md">

				<div className="flex justify-between">
					<div className="text-sm">Service - {user.email}</div>
					<div className="text-sm">
						{serviceRequest.status}
					</div>
					{ /*
						<div className="p-8">
							<label className="text-base" htmlFor="status">Filter Messages: </label>
							<select className="form-select max-w-xs" name="status" value={serviceRequest.status}
							        onChange={(e) => setFilter(e.target.value)}>
								<option>Pending</option>
								<option>Completed</option>
								<option>In Progress</option>
							</select>
						</div>
					*/}
					<GrClose className="float-right" onClick={()=>setShowServiceRequest(false)}/>
				</div>


				<div className="flex flex-col gap-2 my-10 mx-2 sm:my-16 sm:mx-10 text-base">


					<div className="date">
						Date: {serviceRequest.createdAt.substring(0, 10)}
					</div>


					<div className="sender">
						From: {serviceRequest?.unit?.unitID} {serviceRequest?.unit?.street}
					</div>

					<div className="">
						Subject: {serviceRequest.unit.tenantName}
					</div>

					<div className="subject font-bold">
						Subject: {serviceRequest.title}
					</div>

					<div className="body mx-4 my-8">
						{serviceRequest.description}
					</div>
				</div>


			</div>
		</ModalWrapper>
	);
};

export default ServiceRequest;