
const FormRow = ({ labelText, type, name, value, handleChange  }) => {

	return (
		<div className='grid grid-cols-2'>

			<label
				htmlFor={name}
				className='mt-3'
			>
				{labelText || name}
			</label>

			<input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={labelText}
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>

		</div>
	)
}

export default FormRow