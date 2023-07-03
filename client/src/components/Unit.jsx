
const Unit = (unit) => {

	const { property, address, status, tenant, unitID, rent, fmrRent, appliances, repairs } = unit

	return (
		<div className="tenant">
			<div className="tenant-info">
				<h5>{property.propertyID}</h5>
				<h5>{address.street}</h5>
				<h5>{status}</h5>
			</div>
		</div>
	);
};

export default Unit;