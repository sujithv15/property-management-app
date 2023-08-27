import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalWrapper from "./ModalWrapper.jsx";

const CreateMessageForm = ({ setShowComposeMessage, recipient }) => {
	// get user var and createMessage function
	const { user, createMessage, role, users  } = useGlobalContext()

	// mail only allowed to be sent to admin (not other tenants)
	const initialState = {
		sender: user._id,
		senderName: `${user.firstName} ${user.lastName}`,
		recipient: recipient,
		unit: user.unit,
		subject: "",
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
		if (!values.recipient || !values.body) {
			toast('Enter valid recipient and body')
			return
		}

		createMessage(values)
		toast.success('Message Successfully Sent')
		setShowComposeMessage(false)
	}

	return (
		<ModalWrapper>
		<div className="modal max-w-lg">
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-title">Compose Message</div>

				<div className="form-content">

					<div className="to">
						{role === "admin" ?
							<div>
								<label className="form-label" htmlFor="recipient">Recipient: </label>
								<select className="form-select" name="recipient" value={values.recipient}
								        onChange={handleChange}>
									{
										users?.map(user => {
											return (
												<option
													key={user._id}
													value={user._id}
												>
													{user.lastName}, {user.firstName}
												</option>
											)
										})
									}
								</select>
							</div>
							:
							<div>
								<label className="form-label" htmlFor="recipient">Recipient: </label>
								<input className="form-input left-0">{values.recipient} </input>
							</div>
						}
					</div>

					<div className="subject">
						<label className="form-label" htmlFor="subject">Subject: </label>
						<input className="form-input" type="text" name="subject" value={values.subject} onChange={handleChange} />
					</div>

					<div className="body">
						<label className="form-label">Message
							<textarea placeholder="Message" name="body" value={values.body} onChange={handleChange} className="form-textarea"/>
						</label>
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

export default CreateMessageForm;