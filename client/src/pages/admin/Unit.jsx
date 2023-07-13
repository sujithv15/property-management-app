import ax from '../../utils/ax.jsx'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";

const Unit = () => {

	const unit_id = useParams().id
	const [unit, setUnit] = useState({})

	const fetchAndSetUnit = async () => {
		try {
			const response = await ax(`/admin/units/${unit_id}`)
			const { unit } = response.data
			console.log(response);
			setUnit(unit)
		} catch (error) {
			throw Error(error)
		}
	}

	useEffect(() => {
		fetchAndSetUnit()
	}, [])


	return (
		<div className="">

			<div className="text-center">
				<h2 className="text-center m-5 text-2xl">Units</h2>
			</div>

			<div className="grid grid-cols-5 mb-4 pt-3 justify-items-start border-t-2 ml-10">


				<div className="unit-type">
					<p>{unit?.bedrooms}br/ {unit?.bathrooms}ba</p>
				</div>

				<div className="unit-rent">
					<p>${unit?.rent}</p>
				</div>

				<div className="unit-occupied">
					{unit?.isOccupied ? 'Yes' : 'No'}
				</div>
			</div>


		</div>
	);
};

export default Unit;