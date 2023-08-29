import { useGlobalContext} from "../context/GlobalContext.jsx";

const GuestLogin = () => {

	const { loginUser } = useGlobalContext();

	const guestLogin = (e) => {
		e.preventDefault()
		const email = "allidoiswin@mail.com";
		const password = "temp-password";
		loginUser({ email, password })
	}

	const adminLogin = (e) => {
		e.preventDefault()
		const email = "admin@mail.com";
		const password = import.meta.env.VITE_ADMIN_PASSWORD;
		loginUser({ email, password });
	};


	return (
		<div className="flex gap-2">
			<div className="flex flex-col">
				<div className="text-base text-center">
					<button className="underline text-blue-500 hover:cursor-pointer hover:text-cyan-500"
					        onClick={adminLogin}>Log In</button> as Admin
				</div>
				<div className="text-base text-center">
					<button className="underline text-blue-500 hover:cursor-pointer hover:text-cyan-500"
					        onClick={guestLogin}>Log In</button> as Tenant
				</div>
			</div>
		</div>
	);
};

export default GuestLogin;