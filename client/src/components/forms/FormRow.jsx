
const FormRow = ({ labelText, type, name, value, handleChange  }) => {

	return (
		<div className='form-row'>

			<label
				htmlFor={name}
				className='form-label'
			>
				{labelText || name}
			</label>

			<input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				className='form-input'
			/>

		</div>
	)
}

export default FormRow