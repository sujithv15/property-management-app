import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";


const App = () => {

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
		<ul>
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
	);
};

export default App;
