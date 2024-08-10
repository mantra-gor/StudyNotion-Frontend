import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import Spinner from "../../ui/spinner/Spinner";
import SidebarLink from "./SidebarLink";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
import { logout } from "../../../services/operations/authApi";
import FocusLock from "react-focus-lock";

function Sidebar() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  if (authLoading || profileLoading) {
    return <Spinner />;
  }
  const Settings = {
    name: "Settings",
    path: "/dashboard/settings",
    icon: "VscSettingsGear",
  };

  const logoutUser = () => {
    dispatch(logout(navigate));
  };
  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };
  return (
    <div className="bg-richblack-800/50">
      <div className="flex min-w-[222px] h-full flex-col border-r border-r-richblack-700">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type == user?.accountType || !link.type) {
              return <SidebarLink key={link.id} data={link} />;
            }
          })}
          <div className="w-10/12 mx-auto h-[1px] bg-richblack-700 my-4" />
          <SidebarLink data={Settings} />
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="flex gap-2 justify-start items-center p-2 pl-4 text-richblack-300 transition-all duration-200"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
      {logoutModalOpen && (
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
    </div>
  );
}

export default Sidebar;
