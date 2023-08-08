import { useState } from "react";
import { ax } from "../../utils/ax.jsx"
import ModalWrapper from "./ModalWrapper.jsx";

const FileUploadForm = ({ unit_id, setShowImageForm }) => {

	const [imageUpload, setImageUpload] = useState({ image: "" })

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
	const handleFileUpload = async (e) => {
		// file selected by user
		const file = e.target.files[0]
		// convert file to base64 format to store in MongoDB
		const base64 = await convertToBase64(file)
		setImageUpload({ ...imageUpload, image: base64})
	}

	const createImage = async (image) => {
		try {
			const response = await ax.post(`/admin/units/${unit_id}`, image)
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		createImage(imageUpload)
		setShowImageForm(false)
	}

	return (
		<ModalWrapper>
			<div className="modal max-w-lg">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-title">Upload Image</div>
					<label
						htmlFor="file-upload"
						className="form-label pb-8">
						<img src={imageUpload?.image} alt="" width="420px"/>
					</label>
					<input
						type="file"
						name="myFile"
						id="file-upload"
						accept=".jpeg, .jpg, .png"
						onChange={(e) => handleFileUpload(e)}
					/>
					<div className="flex m-6 gap-4 justify-center">
						<button className="btn" type="submit">upload</button>
						<button
							type="button"
							onClick={()=>setShowImageForm(false)}
							className="btn">
							cancel
						</button>
					</div>

				</form>
			</div>
		</ModalWrapper>

	);
};



export default FileUploadForm;