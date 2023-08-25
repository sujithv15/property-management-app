import { axHUD } from "../../utils/ax.jsx";
import { FormRow, FormRowSelect } from "../../components/forms/index.js";
import { useEffect, useState } from "react";

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
		<div className="research-page">

			<div className="title border-b-2">Research</div>
			<div className="text-2xl mt-10 text-center mb-12">Search Nationwide Fair Market Rental Values</div>

			<form className="flex flex-col gap-4 mx-20">

				<FormRowSelect
					labelText="state" name="stateCode" list={statesList}
					handleChange={handleChangeStateCode}
					inputStyle=""
					style='items-center'
				>
				</FormRowSelect>

				{
					counties.length > 0 &&

					<FormRowSelect
						labelText="county" name="countyCode" list={counties.map(county => county.name)}
						handleChange={handleChangeCounty}
						inputStyle=""
						style='items-center'
					>
					</FormRowSelect>
				}

				{
					fmrByZip?.length > 0 &&

					<FormRowSelect
						labelText="zip" name="zipCode" list={fmrByZip.map(zip => zip.zip_code)}
						handleChange={handleSelectZipCode}
						inputStyle=""
						style='items-center'
					>
					</FormRowSelect>
				}
			</form>
			<div>
				{
					fmrData &&
					<table className="table-fixed mx-auto my-12 ">
						<thead className="text-xl">
						<tr className="">
							<th>
								- Fair Market Rent values 2023 -
							</th>
						</tr>
						</thead>

						<tbody className="text-lg">
						<tr>
							<td>Efficiency</td>
							<td>${fmrData.Efficiency}</td>
						</tr>
						<tr>
							<td>One-Bedroom</td>
							<td>${fmrData["One-Bedroom"]}</td>
						</tr>
						<tr>
							<td>Two-Bedroom</td>
							<td>${fmrData["Two-Bedroom"]}</td>
						</tr>
						<tr>
							<td>Three-Bedroom</td>
							<td>${fmrData["Three-Bedroom"]}</td>
						</tr>
						<tr>
							<td>Four-Bedroom</td>
							<td>${fmrData["Four-Bedroom"]}</td>
						</tr>
						</tbody>
					</table>
				}
			</div>

		</div>
	);
};

export default Research;