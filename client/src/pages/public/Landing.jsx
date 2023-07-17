import img1 from '../../assets/images/landing-key.jpg'
import img2 from '../../assets/images/landlod-tenant.jpeg'
import img3 from '../../assets/images/magnifying.jpeg'
import img4 from '../../assets/images/laptop.jpeg'
import img5 from '../../assets/images/condos.jpeg'

const Landing = () => {

	return (
		<div className="title container">
			<div className="text-center m-5 text-2xl">Property Management Assistant</div>


			<div className="grid grid-cols-2 gap-4">

				<div className="col-span-2 bg-stone-200 flex">
					<div className="px-1 text-center my-auto text-2xl">
						The only one-stop solution to seamlessly manage all your properties in one place
					</div>
					<img src={img1} alt="Key-logo" className="max-w-2xl"/>
				</div>

				<div className="col-span-2 flex">
					<img src={img5} alt="condos" className="max-w-sm"/>
					<div className="px-1 text-center my-auto text-2xl">
						Whether you're a real estate expert or buying you're first property, we have a plan for you.
					</div>

				</div>

				<div className="flex flex-col">
					<div className="px-1 text-center my-auto text-2xl">
						We know managing your real estate investments can be challenging. And property management companies take a big chunk out of your income. Let us do the tough part for you.
					</div>
					<img src={img3} alt="magnifying" className="w-fit"/>
				</div>

				<div className="flex flex-col">
					<img src={img2} alt="landlord-tenant" className="max-w-2xl"/>
					<div className="px-1 text-center my-auto text-2xl">
						Easily interact with tenants, collect rent and automatically generate rent receipts
					</div>
				</div>

				<div className="col-span-2 flex">
					<div className="px-1 text-center my-auto text-2xl">
						Homeowners insurance? Taxes? Associate fees? We take care of organizing your payments so you can take care of your priorities
					</div>
					<img src={img4} alt="laptop" className="max-w-2xl"/>
				</div>


			</div>


		</div>
	);
};

export default Landing;