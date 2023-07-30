
const FormRow = ({ labelText, type, name, value, handleChange, style, labelStyle, inputStyle  }) => {

	const rowClassName = `form-row ${style}`
	const labelClassName = `form-label ${labelStyle}`
	const inputClassName = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-input ${inputStyle}`

	return (
		<div className={rowClassName}>

			<label
				htmlFor={name}
				className={labelClassName}
			>
				{labelText || name}
			</label>

			<input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={labelText}
				className={inputClassName}
			/>

		</div>
	)
}

export default FormRow