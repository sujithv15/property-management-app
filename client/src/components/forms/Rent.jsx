
const Rent = (rent) => {
	const { amount, balance, isAssisted, rentAssistance } = rent

	return (
		<div className="rent">
			<div className="rent-info">
				<h5>{amount}</h5>
			</div>
		</div>
	);
};

export default Rent;