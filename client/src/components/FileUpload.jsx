import { useState } from "react";
import { ax } from "../utils/ax.jsx"
const FileUpload = () => {

	const [imageUpload, setImageUpload] = useState({ myFile: "" })

	const handleFileUpload = async (e) => {
		// file selected by user
		const file = e.target.files[0]
		// convert file to base64 format to store in MongoDB
		const base64 = await convertToBase64(file)
	}

	const createImagePost = async (image) => {
		try {
			await ax.post('/uploads', image)
		} catch (error) {
			console.log(error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label
					htmlFor="file-upload"
					className=""
				/>
				<input
					type="file"
					name="myFile"
					id="file-upload"
					accept=".jpeg, .jpg, .png"
					onChange={(e) => handleFileUpload(e)}
				/>
				<button type="submit">submit</button>
			</form>
		</div>
	);
};

// convert file to base64 to store in database
const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.readAsDataURL(file)
		fileReader.onload = () => {
			resolve(fileReader.result)
		}
		fileReader.onerror = (error) => {
			reject(error)
		}
	})
}

export default FileUpload;