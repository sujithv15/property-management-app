import ModalWrapper from "./forms/ModalWrapper.jsx";
import { GrClose } from "react-icons/gr"
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { RiReplyFill } from "react-icons/ri"
import { CreateMessageForm } from "./forms"
import { useEffect, useState } from "react";

const Message = ({ message, setShowMessage, toggleMessageRead }) => {

	const { user, toggleMessageUnread, toggleMessageFlag, getMessages } = useGlobalContext()

	const [showReplyMessage, setShowReplyMessage] = useState(false)


	useEffect(() => {
		toggleMessageRead(message)
	}, [])


	return (
		<ModalWrapper>

			{ showReplyMessage && <CreateMessageForm setShowComposeMessage={setShowReplyMessage} recipient={message.senderEmail}/>}
		<div className="modal-msg max-w-md">

			<div className="flex justify-between">
				<div className="text-sm">Inbox - {user.email}</div>
				<div className="text-sm">
					{message.flag && <>Flagged</>}
				</div>

				<div className="text-sm hover:cursor-pointer" onClick={()=>toggleMessageUnread(message)}>Mark as Unread</div>
				<GrClose className="float-right" onClick={()=>setShowMessage(false)}/>
			</div>


			<div className="flex flex-col gap-2 my-10 mx-2 sm:my-16 sm:mx-10 text-base">
				<div className="flex hover:cursor-pointer" onClick={()=>setShowReplyMessage(true)}>
					<RiReplyFill className="text-3xl"/>
				</div>

				<div className="date">
					Date: {message.createdAt.substring(0, 10)}
				</div>


				<div className="sender">
					From: {message.senderName}
				</div>

				<div className="subject font-bold">
					Subject: {message.subject}
				</div>

				<div className="body mx-4 my-8">
					{message.body}
				</div>
			</div>


		</div>
		</ModalWrapper>
	);
};

export default Message;