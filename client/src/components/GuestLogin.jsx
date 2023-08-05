import { useGlobalContext} from "../context/GlobalContext.jsx";

const GuestLogin = () => {

	const { loginUser } = useGlobalContext();

	const guestLogin = () => {
		const email = "admin@mail.com";
		const password = import.meta.env.VITE_ADMIN_PASSWORD;
		loginUser({ email, password });
	};


	return (
		<div>
			<div className="max-w-sm mx-auto">
				<a
				className="underline text-blue-500 hover:cursor-pointer hover:text-cyan-500"
				onClick={guestLogin}>Click here</a> to login as admin to tour the app so far! It's still under construction, and more features are regularly being added!
			</div>

		</div>
	);
};

export default GuestLogin;