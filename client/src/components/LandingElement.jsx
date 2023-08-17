

const LandingElement = ({ caption, image, imageAlt="img", style }) => {
	return (
		<div className={`flex flex-col md:flex-row snap-always snap-mandatory ${style}`}>
			<div className="p-2 text-center my-auto text-xl">
				{caption}
			</div>
			<img src={image} alt={imageAlt} className="md:w-1/2"/>
		</div>
	);
};

const LandingAltElement = ({ caption, image, imageAlt="img", style }) => {
	return (
		<div className={`flex flex-col md:flex-row ${style}`}>
			<img src={image} alt={imageAlt} className="md:w-1/2"/>
			<div className="p-2 text-center my-auto text-xl">
				{caption}
			</div>
		</div>
	);
};

export { LandingElement, LandingAltElement } ;