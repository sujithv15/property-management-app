import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Message } from "../../components/index.js";
import { CreateMessageForm } from "../../components/forms"
import { useEffect, useState } from "react";
import { IoMailUnreadOutline } from "react-icons/io5";
import { TbFlag, TbFlagFilled } from "react-icons/tb";

const MessagesUser = () => {
	const { messages, sentMessages, getMessages, toggleMessageRead, toggleMessageFlag } = useGlobalContext()

	const [showComposeMessage, setShowComposeMessage] = useState(false)
	const [showMessage, setShowMessage] = useState(false)
	const [displayMessage, setDisplayMessage] = useState()

	// when user clicks message subject or body, current msg is stored in local state, modal will trigger to open full message, and will mark message as read
	const openMessageModal = (message) => {
		toggleMessageRead(message)
		setDisplayMessage(message)
		setShowMessage(true)
	}

	useEffect(() => {
		getMessages()
	}, [])

	// filter messages: all, unread, flagged, sent
	const [filter, setFilter] = useState("All")

	const filteredMessages = messages?.filter(message => {
		switch (filter) {
			case "All":
				return message
			case "Unread":
				return message.unread === true
			case "Flagged":
				return message.flag === true
			default:
				return message
		}
	})

	return (
		<div>
			<div className="title border-b-2 mx-auto ">Messages</div>

			<div className="flex justify-between p-8">
				<div className="w-1/2">
					<label className="text-base" htmlFor="recipient">Filter Messages: </label>
					<select className="form-select max-w-xs" name="recipient" value={filter} onChange={(e)=>setFilter(e.target.value)}>
						<option>All</option>
						<option>Unread</option>
						<option>Sent</option>
						<option>Flagged</option>
					</select>
				</div>

				<button
					className="btn"
					onClick={()=>setShowComposeMessage(!showComposeMessage)}
				>Compose
				</button>
			</div>

			{ showComposeMessage && <CreateMessageForm setShowComposeMessage={setShowComposeMessage}/> }

			<div className="messages sm:mx-8">
				{
					(filter === "Sent" ? sentMessages : filteredMessages)?.map(message => {
						return (
							<div key={message._id} className="message h-28 p-1 relative">

								{
									message.unread &&
									<IoMailUnreadOutline className="absolute top-0 bottom-0 left-10 my-auto"/>
								}

								<div className="hover:cursor-pointer" onClick={()=>toggleMessageFlag(message)}>
									{
										message.flag ?
											<TbFlagFilled className="absolute top-0 bottom-0 right-10 my-auto" />
											:
											<TbFlag className="absolute top-0 bottom-0 right-10 my-auto" />
									}
								</div>

								<div className="max-w-2xl mx-auto mx-8 px-20 p-1">
									<div className="text-sm">
										<span>{message.createdAt.substring(0, 10)} -- {message.createdAt.substring(12, 19)}</span>
									</div>

									<div className="sender text-xl font-bold">
										{filter === "Sent" ? "Management" : message.senderName}
									</div>

									<div
										className="subject text-base truncate text-ellipsis hover:cursor-pointer"
										onClick={()=>openMessageModal(message)}
									>
										{message.subject}
									</div>

									<div className="body text-sm font-light truncate hover:cursor-pointer text-ellipsis" onClick={()=>openMessageModal(message)}>
										{message.body}
									</div>



								</div>
								{
									showMessage &&
									<Message
										message={displayMessage}
										setShowMessage={setShowMessage}
										toggleMessageRead={toggleMessageRead}
									/>
								}
							</div>

						)

					})
				}

			</div>
		</div>
	);
};

export default MessagesUser;