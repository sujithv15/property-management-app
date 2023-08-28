import {useGlobalContext} from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import { UnitDetails } from "../../components/index.js";
import UnitNewForm from "../../components/forms/UnitNewForm.jsx";

const Units = () => {
	const { readUnits, getUsers, units, getMessages } = useGlobalContext()

	useEffect(() => {
		readUnits()
		getMessages()
		getUsers()
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
		<div className="units-page">

			<div className="title border-b-2 mx-8">Units</div>

			<div className="">
				<div className="flex gap-2 my-8 sm:my-16">
					<input
						className="form-input mx-16 h-10"
						type="search" placeholder="Search Units"
						value={query} onChange={e=>setQuery(e.target.value)}
					/>
				</div>

			</div>

			<div className="grid grid-cols-6 mb-2" >
				<div className="my-auto mx-6 hidden sm:block w-24">
					<button
						className="btn"
						onClick={() => setShowForm(true)}>add Unit
					</button>

					{showForm && <UnitNewForm setShowForm={setShowForm}/>}
				</div>
				<p className="text-xl ml-4 font-bold col-span-2 hidden md:block">Address</p>
				<p className="text-xl font-bold hidden md:block">Beds/Baths</p>
				<p className="text-xl font-bold hidden md:block">Rent</p>


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