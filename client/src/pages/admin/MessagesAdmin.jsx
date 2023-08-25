import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Message } from "../../components/index.js";
import { CreateMessageForm } from "../../components/forms"
import { useEffect, useState } from "react";
import { IoMailUnreadOutline } from "react-icons/io5";
import { TbFlag, TbFlagFilled } from "react-icons/tb";
import messagesUser from "../user/MessagesUser.jsx";

const MessagesAdmin = () => {

	const { messages, getMessages, toggleMessageRead, toggleMessageFlag, unreadMessages } = useGlobalContext()

	const [showComposeMessage, setShowComposeMessage] = useState(false)
	const [showMessage, setShowMessage] = useState(false)
	const [displayMessage, setDisplayMessage] = useState(messages[0] || {})

	// when user clicks message subject or body, current msg stored in local state, modal will trigger to open full message, and will mark message as read
	const openMessageModal = (message) => {
		setDisplayMessage(message)
		setShowMessage(true)
		toggleMessageRead(message)
	}

	useEffect(() => {
		getMessages()
	}, [])

	return (
		<div>
			<div className="title border-b-2 mx-8 ">Messages</div>

			<button
				className="btn m-8"
				onClick={()=>setShowComposeMessage(!showComposeMessage)}
			>Compose Message
			</button>

			{ showComposeMessage && <CreateMessageForm setShowComposeMessage={setShowComposeMessage}/> }

			<div className="messages sm:mx-8">
				{
					messages?.map(message => {
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
										{message.senderName}
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
								{showMessage && <Message message={displayMessage} setShowMessage={setShowMessage}/>}
							</div>

						)

					})
				}

			</div>
		</div>
	);
};

export default MessagesAdmin;