const FormRowSelect = ({ labelText, name, value, defaultValue, handleChange, list, style, labelStyle, inputStyle, selectText }) => {

   const rowClassName = `form-select flex ${style}`
   const labelClassName = `form-label ${labelStyle}`
   const inputClassName = `bg-color-grey shadow border rounded w-full text-gray-700 focus:outline-none focus:ring; ${inputStyle}`

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
        defaultValue={defaultValue}
      >
        {
           list.map((itemValue, index) => {
              return (
                 <option
                    key={index}
                    value={itemValue}
                 >
                    {selectText || itemValue}
                 </option>
              )
           })
        }
      </select>

    </div>
  )
}

export default FormRowSelect
