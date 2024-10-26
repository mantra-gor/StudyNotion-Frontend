import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/spinner/Spinner";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import FocusLock from "react-focus-lock";
import { useState } from "react";
import ConfirmationModal from "../components/common/ConfirmationModal";

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (authLoading || profileLoading) {
    return <Spinner />;
  }

  const logoutUser = () => {
    dispatch(logout(navigate));
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };

  return (
    <div className="w-full h-full flex">
      <Sidebar
        logoutModalOpen={logoutModalOpen}
        setLogoutModalOpen={setLogoutModalOpen}
      />
      <div className="h-full w-full ml-[60px] md:ml-[232px] overflow-x-hidden">
        <div className="w-11/12 mx-auto max-w-[1000px] py-4">
          <Outlet />
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

export default Dashboard;
