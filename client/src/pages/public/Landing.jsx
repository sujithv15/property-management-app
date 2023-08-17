import img1 from '../../assets/images/landing-key_copy.png'
import img3 from '../../assets/images/magnifying_copy.jpeg'
import img4 from '../../assets/images/laptop_copy.jpeg'
import img5 from '../../assets/images/condos_copy.png'
import img6 from '../../assets/images/construction.png'


import { LandingElement, LandingAltElement } from "../../components/LandingElement.jsx";

const Landing = () => {

	return (
		<div className="landing-page">

			<div className="flex flex-col border-4">

				<LandingElement
					caption="The only one-stop solution to seamlessly manage all your properties in one place"
					image={img1}
					imageAlt="Key-Logo"
				/>

				<LandingAltElement
					caption="Whether you're a real estate expert or buying you're first property, we have a plan for you."
					image={img3}
					imageAlt="magnifying"
				/>

				<LandingElement
					caption="We know managing your real estate investments can be challenging. And property management companies take a big chunk out of your income. Let us do the tough part for you!"
					image={img5}
					imageAlt="Condos"
					style="bg-black text-white"
				/>

				<LandingAltElement
					caption="Easily manage maintenance requests, interact with tenants, collect rent and automatically generate rent receipts"
					image={img6}
					imageAlt="handyman"
					style="bg-black text-white"
				/>

				<LandingElement
					caption="Homeowners insurance? Taxes? Associate fees? We take care of organizing your payments so you can take care of your priorities!"
					image={img4}
					imageAlt="laptop"
				/>

			</div>


		</div>
	);
};

export default Landing;