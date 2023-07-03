import {links} from "../pages/user/links.js";
import {NavLink} from "react-router-dom";
import {adminLinks} from "../pages/admin/adminLinks.js";

const Footer = () => {
	return (
		<div className="footer">
			<p>&copy; Sujith Varughese 2023</p>
			<div className="">
				<div className="">
					{
						links.map((link, index) => {
							return (
								<div key={index}>
									<NavLink to={link.url} className="">{link.name}</NavLink>
								</div>
							)
						})}

				</div>


				<div className="">
					{
						adminLinks.map((adminLink, index) => {
							return (
								<div key={index}>
									<NavLink to={adminLink.url} className="">{adminLink.name}</NavLink>
								</div>
							)
						})}
				</div>
			</div>
		</div>
	);
};

export default Footer;