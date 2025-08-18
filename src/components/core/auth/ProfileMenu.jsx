// this component is for mobile device only

import { useContext } from "react";
import { useSelector } from "react-redux";
import { LogoutConfirmationContext } from "../../../context/LogoutConfirmationContext";
import { Link } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";

function ProfileMenu({ setMobileMenuOpen }) {
  const { user } = useSelector((state) => state.profile);
  const { setLogoutModalOpen } = useContext(LogoutConfirmationContext);
  const [ref, setOpen] = useClickOutside();

  return (
    <div className="flex justify-between items-center text-richblack-5">
      <div
        className="cursor-pointer"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <img src={user?.avatar} alt="avatar" className="w-9 rounded-full" />
      </div>
      <div ref={ref} className="flex gap-4">
        <Link
          to="/dashboard/my-profile"
          onClick={() => setMobileMenuOpen(false)}
          className="bg-yellow-50 text-black px-4 py-2 rounded-md"
        >
          Dashboard
        </Link>
        <div
          onClick={() => {
            setLogoutModalOpen(true);
            setOpen(false);
          }}
          className="bg-richblack-700 px-4 py-2 rounded-md"
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
