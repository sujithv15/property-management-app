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

			<div className="section-header">
				<h2>Units</h2>
			</div>

			<div className="units-search">
				<div>
					<span>Search: </span>
					<input className="form-input" type="search" placeholder="Search Units" value={query} onChange={e=>setQuery(e.target.value)}/>
				</div>
				<div className="unit-form">
					{showForm ?
						<UnitNewForm />
						:
						<button className="btn" onClick={() => setShowForm(!showForm)}>add Unit</button>
					}
				</div>
			</div>

			<ul className="units-list">
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