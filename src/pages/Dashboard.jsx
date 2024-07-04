import { useSelector } from "react-redux";
import Spinner from "../components/ui/spinner/Spinner";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className="h-full w-full overflow-x-hidden">
        <div className="w-11/12 mx-auto max-w-[1000px] py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
