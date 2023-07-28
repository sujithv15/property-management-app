const FormRowSelect = ({ labelText, name, value, handleChange, list, style, labelStyle, inputStyle }) => {

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

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={inputClassName}
      >
        {
           list.map((itemValue, index) => {
              return (
                 <option
                    key={index}
                    value={itemValue}
                 >
                    {itemValue}
                 </option>
              )
           })
        }
      </select>

    </div>
  )
}

export default FormRowSelect
