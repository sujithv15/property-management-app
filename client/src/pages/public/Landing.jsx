import img from '../../assets/images/landing-key.jpg'

const Landing = () => {



	return (
		<div className="title container">
			<h2 className="text-center m-5 text-2xl">Property Management Assistant</h2>
			<h4 className="m-10">The only one-stop solution to seamlessly manage all your properties in one place</h4>

			<img src={img} alt="Key-logo"/>

			<ul className="ml-20">
				<li>Easily communicate with tenants</li>
				<li>Manage maintenance and service requests</li>
				<li>Collect rent, and automatically generate rent receipts</li>
				<li>Stay on top of payments</li>
			</ul>

		</div>
	);
};

export default Landing;