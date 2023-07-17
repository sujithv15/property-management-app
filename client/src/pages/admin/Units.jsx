import {useGlobalContext} from "../../context/GlobalContext";
import { useState, useEffect, useMemo } from "react";
import { Alert, Loading } from "../../components/index.js";
import { Unit } from "../../components/index.js";
import UnitNewForm from "../../components/forms/UnitNewForm.jsx";

const Units = () => {
	const { readUnits, isLoading, showAlert, units } = useGlobalContext()

	// state for search function
	const [query, setQuery] = useState("")
	const [showForm, setShowForm] = useState(false)

	// sets state.properties to [list of all properties]
	useEffect(() => {
		readUnits()
	}, [])

	if (isLoading) {
		return <Loading center />;
	}

	// filter units by search by using derived state;
	const queriedUnits = units.filter(unit => {
		return (
			unit.propertyUnit.toLowerCase().includes(query.toLowerCase())  ||
			unit.street.toLowerCase().includes(query.toLowerCase()) ||
			unit.city.toLowerCase().includes(query.toLowerCase()) ||
			unit.state.toLowerCase().includes(query.toLowerCase()) ||
			unit.zip.toLowerCase().includes(query.toLowerCase())
		)
	})

	return (
		<div className=" units-container page">

			<div className="text-center">
				<h2 className="text-center m-5 text-2xl">Units</h2>
			</div>

			<div className="flex justify-between my-5">

				<div className="flex gap-2 ml-10">
					<label className="block text-gray-700 font-bold mb-2 pt-2">Search: </label>
					<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="search" placeholder="Search Units" value={query} onChange={e=>setQuery(e.target.value)}/>
				</div>

				<div className="mr-10">
					{showForm ?
						<>
							<UnitNewForm />
							<button className="relative left-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowForm(false)}>cancel</button>
						</>
						:
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs" onClick={() => setShowForm(true)}>add Unit</button>
					}
				</div>
			</div>

			<div className="grid grid-cols-5 mb-2 justify-items-start ml-10" >
				<p className="text-xl font-bold col-span-2 pl-3">address</p>
				<p className="text-xl font-bold">beds/baths</p>
				<p className="text-xl font-bold">rent</p>
				<p className="text-xl font-bold">occupied</p>
			</div>

			<ul>
				{queriedUnits?.map(unit => {
					return (
						<li key={unit._id}>
							<Unit {...unit}/>
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default Units;