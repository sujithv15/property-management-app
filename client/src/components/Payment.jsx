
const Payment = (payment) => {
	const { payTo, amount, dateDue, datePaid, balance, status, comments } = payment

	return (
		<div className="payment">
			<div className="payment-info">
				<h5>{payTo}</h5>
				<h5>{amount}</h5>
				<h5>{status}</h5>
			</div>
		</div>
	);
};

export default Payment;