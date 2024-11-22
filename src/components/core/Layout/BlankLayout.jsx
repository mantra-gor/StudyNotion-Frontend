import { useContext, useEffect } from "react";
import Navbar from "../../common/Navbar";
import { Outlet } from "react-router-dom";
import FocusLock from "react-focus-lock";
import ConfirmationModal from "../../common/ConfirmationModal";
import { LogoutConfirmationContext } from "../../../context/LogoutConfirmationContext";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../services/operations/authApi";

function BlankLayout() {
  const { logoutModalOpen, logoutUser, cancelLogout } = useContext(
    LogoutConfirmationContext
  );
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.profile.user);

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(authUser());
    }
  }, []);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {!logoutModalOpen ? (
        <Navbar />
      ) : (
        <FocusLock>
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
      <div className="mt-14">
        <Outlet />
      </div>
    </div>
  );
}

export default BlankLayout;
