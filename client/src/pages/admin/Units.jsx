import {useGlobalContext} from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import { UnitDetails } from "../../components/index.js";
import UnitNewForm from "../../components/forms/UnitNewForm.jsx";


const Units = () => {
	const { readUnits, isLoading, units } = useGlobalContext()

	useEffect(() => {
		readUnits()
	}, [])

	// state for search function
	const [query, setQuery] = useState("")
	const [showForm, setShowForm] = useState(false)


	// filter units by search by using derived state;
	// -convert query to lower case and check if any part of the address contains the search
	const queriedUnits = units.filter(unit => {
		return (
			unit.unitID.toLowerCase().includes(query.toLowerCase())  ||
			unit.street.toLowerCase().includes(query.toLowerCase()) ||
			unit.city.toLowerCase().includes(query.toLowerCase()) ||
			unit.state.toLowerCase().includes(query.toLowerCase()) ||
			unit.zip.toLowerCase().includes(query.toLowerCase())
		)
	})

	return (
		<div className="units-page pb-20">

			<div className="title">Units</div>

			<div className="border-t-2 flex justify-between">
				<div className="flex gap-2 mt-8 sm:my-16">
					<label className="block text-gray-700 font-bold pb-2 pt-2 ml-5">
						Search:
					</label>

					<input
						className="shadow border rounded sm:w-80 py-2 px-3 text-gray-700 focus:ring focus:outline-none"
						type="search" placeholder="Search Units"
						value={query} onChange={e=>setQuery(e.target.value)}
					/>
				</div>

				<div className="my-auto mr-5 invisible sm:visible">
					<button
						className="btn"
						onClick={() => setShowForm(true)}>add Unit
					</button>

					{showForm && <UnitNewForm setShowForm={setShowForm}/>}
				</div>
			</div>

			<div className="grid grid-cols-5 mb-2" >
				<div></div>
				<p className="text-xl font-bold col-span-2 invisible sm:visible">Address</p>
				<p className="text-xl font-bold invisible sm:visible">Beds/Baths</p>
				<p className="text-xl font-bold invisible sm:visible">Monthly Rent</p>

			</div>

			<ul>
				{queriedUnits?.map(unit => {
					return (
						<li key={unit._id}>
							<UnitDetails {...unit}/>
						</li>
					)
				})}
			</ul>

		</div>
	);
};

export default Units;