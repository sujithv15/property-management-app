import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Message } from "../../components/index.js";
import { useEffect, useState } from "react";
import { CreateMessageForm } from "../../components/forms/index.js";

const MessagesUser = () => {
	const { messages, getMessages } = useGlobalContext()

	const [showComposeMessage, setShowComposeMessage] = useState(false)
	const [showMessage, setShowMessage] = useState(false)

	useEffect(() => {
		getMessages()
	}, [])

	return (
		<div>
			<div className="title border-b-2">Messages</div>

			<div className="messages">
				{
					messages?.map(message => {
						return (
							<div key={message._id} className="max-w-2xl mx-auto m-8 p-4 text-lg border-4">
								<div className="m-1">
									{message.createdAt.substring(0, 10)}
								</div>
								<div className="sender m-1 text-2xl font-bold">
									{message.senderName}
								</div>

								<div className="subject m-1">
									{message.subject}
								</div>

								<div className="body m-1 text-sm font-light">
									{message.body}
								</div>

								{showMessage && <Message message={message} />}

							</div>
						)
					})
				}
			</div>

			<button
				className="btn"
				onClick={()=>setShowComposeMessage(!showComposeMessage)}
			>Compose Message
			</button>

			{ showComposeMessage && <CreateMessageForm setShowComposeMessage={setShowComposeMessage}/> }

		</div>
	);
};

export default MessagesUser;