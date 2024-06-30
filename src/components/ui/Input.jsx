function Input({
  type,
  id,
  name,
  placeholder,
  value,
  required,
  onChange,
  className,
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={onChange}
      className={`${className} bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
      style={{
        boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
      }}
    />
  );
}

export default Input;
