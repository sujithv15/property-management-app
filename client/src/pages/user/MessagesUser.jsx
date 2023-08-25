import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Message } from "../../components/index.js";
import { useEffect, useState } from "react";
import { CreateMessageForm } from "../../components/forms/index.js";

const MessagesUser = () => {
	const { messages, getMessages } = useGlobalContext()

	const [showComposeMessage, setShowComposeMessage] = useState(false)

	useEffect(() => {
		getMessages()
	}, [])

	return (
		<div>
			<div className="title border-b-2">Messages</div>
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