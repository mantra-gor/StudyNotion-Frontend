function InputForm({
  type,
  id,
  name,
  placeholder,
  required,
  className,
  disabled = false,
  register,
  children,
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      {...register(name, { required })}
      className={`${className} bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack ${
        disabled && " !bg-richblack-700/40"
      }`}
      style={{
        boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
      }}
    />
  );
}

export default InputForm;
