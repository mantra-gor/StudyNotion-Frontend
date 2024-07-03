function Button({ children, onClick, active, type = "", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ boxShadow: "-0.5px -1.5px 0px 0px rgba(0, 0, 0, 0.12) inset" }}
      className={`${className} w-full text-center text-[13px] px-6 py-3 rounded-md font-bold hover:brightness-105 active:brightness-110 transition-all duration-200
    ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
    `}
    >
      {children}
    </button>
  );
}

export default Button;
