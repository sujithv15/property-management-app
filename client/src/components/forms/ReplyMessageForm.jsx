import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalWrapper from "./ModalWrapper.jsx";

const ReplyMessageForm = ({ setShowComposeMessage, originalMessage }) => {
	// get user var and createMessage function
	const { user, createMessage, role, users, adminID  } = useGlobalContext()

	// mail only allowed to be sent to admin (not other tenants)
	const initialState = {
		sender: user._id,
		senderName: `${user.firstName} ${user.lastName}`,
		recipient: originalMessage.sender,
		recipientName: originalMessage.senderName,
		unit: user.unit,
		subject: originalMessage.subject,
		body: "",
		flag: false,
		unread: true
	}

	const [values, setValues] = useState(initialState)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (role === 'user') {
			values.recipient = adminID
		}
		if (!values.recipient || !values.body) {
			toast('Enter valid recipient and body')
			return
		}

		createMessage(values)
		toast.success('Message Sent')
		setShowComposeMessage(false)
	}

	return (
		<ModalWrapper>
			<div className="modal max-w-lg">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Reply Message</div>

					<div className="form-content">
						<div className="body">
							<label className="form-label">Message
								<textarea placeholder="Message" name="body" value={values.body} onChange={handleChange} className="form-textarea"/>
							</label>
						</div>
					</div>

					<div className="flex flex-col gap-1 mx-2 sm:my-16 sm:mx-10 text-base">
						<div className="date">
							Date: {originalMessage.createdAt.substring(0, 10)}
						</div>


						<div className="sender">
							From: {originalMessage.senderName}
						</div>

						<div className="subject font-bold">
							Subject: {originalMessage.subject}
						</div>

						<div className="body mx-2 my-2 truncate">
							{originalMessage.body}
						</div>
					</div>



					<div className="flex justify-around pt-10">
						<button
							type="submit"
							className='btn'>
							Send
						</button>

						<button
							className="btn"
							onClick={() => setShowComposeMessage(false)}>
							Cancel
						</button>

					</div>
				</form>
			</div>
		</ModalWrapper>
	);
};

export default ReplyMessageForm;