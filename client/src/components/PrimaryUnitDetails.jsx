

const PrimaryUnitDetails = (unit) => {

	const { address, isPrimary, tenant, user, bedrooms, bathrooms, rent, fmrRent, appliances, repairs, insurance, mortgage, association, taxes, maintenance } = unit

	return (
		<div className="primary-unit-details">
			<div className="unit-insurance">
				Insurance: {insurance?.company} {insurance?.premium} {insurance?.details}
			</div>

			<div className="unit-mortgage">
				mortgage
			</div>

			<div className="unit-taxes">
				taxes
			</div>

			<div className="unit-association">
				association
			</div>

			<div className="unit-maintenance">
				association
			</div>

		</div>
	);
};

export default PrimaryUnitDetails;