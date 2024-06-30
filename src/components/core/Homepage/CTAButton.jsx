import { Link } from "react-router-dom";

function CTAButton({ children, linkTo, active }) {
  return (
    <Link
      to={linkTo}
      style={{ boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset" }}
      className={` max-w-fit text-center text-[13px] px-6 py-3 rounded-md font-bold hover:brightness-105 active:scale-95 transition-all duration-200
    ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
    `}
    >
      {children}
    </Link>
  );
}

export default CTAButton;
