import {Unit} from "../../components";
import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";

import {useEffect} from "react";
import {Loading} from "../../components";
import UnitForm from "../../components/forms/UnitForm.jsx";



const Units = () => {


	const { isLoading, readUnits, units } = useGlobalContext()




	useEffect(() => {
		readUnits()
	}, [])

	if (isLoading) {
		return <Loading center />;
	}
	if (units.length === 0) {
		return (
			<h2>No units to display...</h2>
		);
	}

	return (
		<div className="page">
			<div className="display-container units">
				{units?.map(unit => {
					return (
						<div key={unit._id} className="unit-container">
							<Unit {...unit}/>
						</div>
					)
				})}
			</div>

			<UnitForm />

		</div>
	);
};

export default Units;