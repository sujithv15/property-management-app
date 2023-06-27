import {useState, useEffect} from "react";
import axios from "axios";


const Rents = () => {

	const [rents, setRents] = useState([]);

	const getRentPayments = async () => {
		try {
			const {data} = await axios("http://localhost:8800/api/v1/rent");
			setRents(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRentPayments()
	}, [])

	return (
		<div>
			<ul>
				<h4>Sample Data:</h4>
				{
					rents.map(unit => {
						return (
							<div key={unit.id}>
								<li>
									{unit.name}
									{unit.rent}
									{unit.balance}
								</li>
							</div>
						)
					})
				}

			</ul>
		</div>
	);
};

export default Rents;