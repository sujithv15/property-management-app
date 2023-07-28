import { axHUD } from "../../utils/ax.jsx";
import { FormRow, FormRowSelect } from "../../components/forms/index.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const statesList = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

const year = 2023

const Research = () => {

	const [counties, setCounties] = useState([])
	const [fmrByZip, setFmrByZip] = useState([])

	const [fmrData, setFmrData] = useState(null)

	// after user selects a state, fetch a list of counties and the county code, then prompt user for county
	const getCountyList = (stateCode) => {
		const fetchData = async () => {
			try {
				// retrieves list of counties { state_code, fips_code, county_name, town_name, category }
				const response = await axHUD(`/listCounties/${stateCode}`)
				// we need only county_name to populate list and fips_code to then fetch by code
				const counties = response.data.map(county => {
					return {
						name: county.county_name,
						code: county.fips_code
					}
				})
				// form will only populate list if counties state array length > 0
				setCounties(counties)
			} catch (error) {
				console.log(error);
			}
		}
		fetchData()
	}

	// after user selects county, fetch a list of zip codes(if metro county) with FMR list
	const getZipCodeList = (countyCode) => {
		const fetchData = async () => {
			try {
				// retrieve list { zip_code, Efficiency, One-Bedroom, Two-Bedroom, Three-Bedroom, Four-Bedroom }
				const response = await axHUD(`/data/${countyCode}?year=${year}`)
				// if classified as small area, data is not seperated by zipcodes
				if (response.data.data.smallarea_status === "0") {
					setFmrData(response.data.data.basicdata)
				} else {
					const zipCodes = response.data.data.basicdata
					// form will only display zip codes to user once state array is populated
					setFmrByZip(zipCodes)
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchData()
	}





	const handleChangeStateCode = (e) => {
		// to clear values in case user picks different state after selecting zip
		setFmrByZip([])
		setFmrData(null)
		getCountyList(e.target.value)
	}

	const handleChangeCounty =(e) => {
		setFmrByZip([])
		setFmrData(null)
		const county = counties.find(county => county.name === e.target.value)
		getZipCodeList(county.code);
	}

	// set our final data to display
	const handleSelectZipCode = (e) => {
		const data = fmrByZip.find(zip => zip.zip_code === e.target.value)
		setFmrData(data)
	}



	return (
		<div className="page">
			<h2>research</h2>

			<form>
				<FormRowSelect
					labelText="state" name="stateCode" list={statesList}
					handleChange={handleChangeStateCode}>
				</FormRowSelect>


				{
					counties.length > 0 &&

					<FormRowSelect
						labelText="county" name="countyCode" list={counties.map(county => county.name)}
						handleChange={handleChangeCounty}>
					</FormRowSelect>
				}

				{
					fmrByZip?.length > 0 &&

					<FormRowSelect
						labelText="zip" name="zipCode" list={fmrByZip.map(zip => zip.zip_code)}
						handleChange={handleSelectZipCode}>
					</FormRowSelect>
				}

				{
					fmrData &&
					<div>
						<div className="text-center m-10 text-2xl">Fair Market Rent values</div>
						<div className="grid grid-cols-2 gap-5 text-center">
							<div>Efficiency</div><div>${fmrData.Efficiency}</div>
							<div>One-Bedroom</div><div>${fmrData["One-Bedroom"]}</div>
							<div>Two-Bedroom</div><div>${fmrData["Two-Bedroom"]}</div>
							<div>Three-Bedroom</div><div>${fmrData["Three-Bedroom"]}</div>
							<div>Four-Bedroom</div><div>${fmrData["Four-Bedroom"]}</div>
						</div>
					</div>

				}



			</form>
		</div>
	);
};

export default Research;