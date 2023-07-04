
const Tenant = (tenant) => {

	const { lastName, firstName, email, phone, balance, isAssisted, rentAssistance } = tenant

	return (
		<div className="tenant">
			<div className="tenant-info">
				<p>{email}</p>
				<p>{phone}</p>
			</div>
		</div>
	);
};

export default Tenant;