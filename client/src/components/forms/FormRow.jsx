
const FormRow = ({ labelText, type, name, value, handleChange, style, labelStyle, inputStyle  }) => {

	const rowClassName = `flex gap-2 ${style}`
	const labelClassName = `mt-3 block text-lg capitalize self-end ${labelStyle}`
	const inputClassName = `bg-color-grey shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${inputStyle}`

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