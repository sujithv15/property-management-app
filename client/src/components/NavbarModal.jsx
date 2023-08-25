import ModalWrapper from "./forms/ModalWrapper.jsx";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const NavbarModal = ({ links, setShowNavModal }) => {

	const { logoutUser } = useGlobalContext()

	const handleLogout =  () => {
		logoutUser()
	}

	return (
		<ModalWrapper onClick={()=>setShowNavModal(false)}>
			<div className="modal-nav grid grid-cols-1 divide-y divide-slate-400">
				{
					links.map((links, index) => {
						return (
								<NavLink key={index} className="modal-btn" to={links.url}>{links.name}</NavLink>
						)
					})
				}
				<button type="submit" className="modal-btn" onClick={handleLogout}>Logout</button>
			</div>
		</ModalWrapper>
	);
};

export default NavbarModal;