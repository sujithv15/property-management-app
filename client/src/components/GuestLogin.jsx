import { useGlobalContext} from "../context/GlobalContext.jsx";

const GuestLogin = () => {

	const { loginUser } = useGlobalContext();

	const guestLogin = (e) => {
		e.preventDefault()
		const email = "admin@mail.com";
		const password = import.meta.env.VITE_ADMIN_PASSWORD;
		loginUser({ email, password });
	};


	return (
		<div>
			<div className="max-w-sm mx-auto">
				Or <button className="underline text-blue-500 hover:cursor-pointer hover:text-cyan-500"
				        onClick={guestLogin}>click here</button> to access the site as Admin!
			</div>

		</div>
	);
};

export default GuestLogin;