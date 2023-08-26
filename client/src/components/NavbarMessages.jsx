import { FiMail } from "react-icons/fi"
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { NavLink } from "react-router-dom";
const NavbarMessages = () => {


	const { unreadMessageCount } = useGlobalContext()

	return (
		<div className="flex">
			<FiMail />
			{
				unreadMessageCount > 0 &&
				<div className="text-lg">
					({unreadMessageCount})
				</div>
			}

		</div>
	);
};

export default NavbarMessages;