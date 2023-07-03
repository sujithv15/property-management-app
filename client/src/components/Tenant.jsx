
const Tenant = (tenant) => {

	const { unit, lastName, firstName, email, phone, rent } = tenant

	return (
		<div className="tenant">
			<div className="tenant-info">
				<h5>{unit.unitID}</h5>
				<h5>{lastName}</h5>
				<h5>{firstName}</h5>
				<h5>{email}</h5>
				<h5>{phone}</h5>
			</div>
		</div>
	);
};

export default Tenant;