import { FaSpinner } from "react-icons/fa";

function Button({
  children,
  onClick,
  active,
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      style={{ boxShadow: "-0.5px -1.5px 0px 0px rgba(0, 0, 0, 0.12) inset" }}
      className={`${className} w-full flex items-center justify-center text-center text-[13px] px-6 py-3 rounded-md font-bold hover:brightness-105 active:brightness-110 
        transition-all duration-200
        ${
          isDisabled
            ? "bg-richblack-300 text-richblack-900 cursor-not-allowed"
            : active
            ? "bg-yellow-50 text-black"
            : "bg-richblack-800 text-white"
        }`}
    >
      {loading ? <FaSpinner className="animate-spin mr-2" size={14} /> : null}
      {loading ? "Processing..." : children}
    </button>
  );
}

export default Button;
