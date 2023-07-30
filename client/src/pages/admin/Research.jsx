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
		<div className="research-page pb-20">

			<div className="text-center py-5 text-5xl">Research</div>
			<div className="text-2xl ml-6 mt-10 mb-4">Search Fair Market Values</div>

			<form className="ml-16 flex flex-col gap-4">

				<FormRowSelect
					labelText="state" name="stateCode" list={statesList}
					handleChange={handleChangeStateCode}
					inputStyle="w-20"
					style='flex-col'
				>
				</FormRowSelect>

				{
					counties.length > 0 &&

					<FormRowSelect
						labelText="county" name="countyCode" list={counties.map(county => county.name)}
						handleChange={handleChangeCounty}
						inputStyle="w-1/2"
						style='flex-col'
					>
					</FormRowSelect>
				}

				{
					fmrByZip?.length > 0 &&

					<FormRowSelect
						labelText="zip" name="zipCode" list={fmrByZip.map(zip => zip.zip_code)}
						handleChange={handleSelectZipCode}
						inputStyle="w-1/6 mb-20"
						style='flex-col'
					>
					</FormRowSelect>
				}

				{
					fmrData &&
						<table className="table-fixed">
							<thead className="text-2xl">
								<tr>
									<th>
										Fair Market Rent values
									</th>
								</tr>
							</thead>

							<tbody className="text-lg leading-10">
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
			</form>

		</div>
	);
};

export default Research;