import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import FocusLock from "react-focus-lock";
import ConfirmationModal from "../../common/ConfirmationModal";
import { logout } from "../../../services/operations/authApi";
import useClickOutside from "../../../hooks/useClickOutside";

function ProfileDropdown() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [ref, open, setOpen] = useClickOutside();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout(navigate));
  };
  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };
  return (
    <>
      <div className="w-full h-full relative">
        {/* group */}
        <div
          className="cursor-pointer"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <img src={user?.avatar} alt="avatar" className="w-7 rounded-full" />
        </div>

        {open && (
          <div
            ref={ref}
            className=" md:w-[200px] -left-4 absolute top-[45px] flex flex-col rounded-md 
        bg-richblack-800 p-1 text-richblack-50 transition-all duration-200 
           drop-shadow-white-lg z-30"
            //  group-hover:visible group-hover:opacity-100
          >
            <Link
              className="p-2 hover:bg-richblack-700 rounded-md"
              to="/dashboard/my-profile"
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center gap-2">
                <VscAccount />
                Dashboard
              </div>
            </Link>
            <div
              className="p-2 hover:bg-richblack-700 rounded-md"
              onClick={() => {
                setLogoutModalOpen(true);
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <FiLogOut />
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
      {logoutModalOpen && (
        <FocusLock returnFocus={{ preventScroll: false }}>
          <ConfirmationModal
            modalTitle="Are you sure ?"
            modalText="You will be logged out of your account."
            highlightedBtnText="Logout"
            btnText="Cancel"
            highlightedBtnOnClick={logoutUser}
            btnOnclick={cancelLogout}
          />
        </FocusLock>
      )}
    </>
  );
}

export default ProfileDropdown;
