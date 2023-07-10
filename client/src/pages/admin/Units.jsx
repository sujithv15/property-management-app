import {useGlobalContext} from "../../context/GlobalContext";
import {useState, useEffect} from "react";
import { Alert, Loading } from "../../components/index.js";
import { Unit } from "../../components/index.js";
import UnitForm from "../../components/forms/UnitForm.jsx";

const Units = () => {
	const { readUnits, isLoading, showAlert, units } = useGlobalContext()

	const [showForm, setShowForm] = useState(false)

	// sets state.properties to [list of all properties]
	useEffect(() => {
		readUnits()
	}, [])

	if (isLoading) {
		return <Loading center />;
	}


	return (
		<div className="units-page page">

			<div className="section-header">
				<h2>Units</h2>
			</div>

			{showAlert && <Alert />}

			<div className="units-container">
				<ul className="units-list">
					{units?.map(unit => {
						return (
							<li key={unit._id}>
								<Unit {...unit}/>
							</li>
						)
					})}
				</ul>
			</div>

			<div className="unit-form">
				{showForm ?
					<UnitForm />
					:
					<button className="btn" onClick={() => setShowForm(!showForm)}>add Unit</button>
				}
			</div>

		</div>
	);
};

export default Units;