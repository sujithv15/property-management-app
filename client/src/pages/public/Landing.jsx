import img1 from '../../assets/images/landing-key.jpg'
import img2 from '../../assets/images/landlod-tenant.jpeg'
import img3 from '../../assets/images/magnifying.jpeg'
import img4 from '../../assets/images/laptop.jpeg'
import img5 from '../../assets/images/condos.jpeg'
const Landing = () => {


	return (
		<div className="title container">
			<div className="text-center m-5 text-2xl">Property Management Assistant</div>


			<div className="grid grid-cols-2">

				<div className="col-span-2">
					The only one-stop solution to seamlessly manage all your properties in one place
					<img src={img1} alt="Key-logo"/>
				</div>

				<div className="col-span-2">
					Whether you're a real estate expert or buying you're first property, we have a plan for you.
					<img src={img5} alt="condos"/>
				</div>

				<div className="">
					We know managing your real estate investments can be challenging. And property management companies take a big chunk out of your income. Let us do the tough part for you.
					<img src={img3} alt="magnifying"/>
				</div>

				<div className="">
					Easily interact with tenants, collect rent and automatically generate rent receipts
					<img src={img2} alt="landlord-tenant"/>
				</div>

				<div className="">
					Homeowners insurance? Taxes? Associate fees? We take care of organizing your payments so you can take care of your priorities
					<img src={img4} alt="laptop"/>
				</div>


			</div>


		</div>
	);
};

export default Landing;