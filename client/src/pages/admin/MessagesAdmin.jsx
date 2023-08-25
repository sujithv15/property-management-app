import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Message } from "../../components/index.js";
import { CreateMessageForm } from "../../components/forms"
import { useEffect, useState } from "react";

const MessagesAdmin = () => {

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

export default MessagesAdmin;