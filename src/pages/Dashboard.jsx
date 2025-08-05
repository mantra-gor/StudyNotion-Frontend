import { useSelector } from "react-redux";
import Spinner from "../components/ui/spinner/Spinner";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <Spinner />;
  }

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored !== null ? stored === "true" : window.innerWidth <= 768;
  });

  return (
    <div className="w-full h-full flex">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div
        className={`h-full w-full overflow-x-hidden duration-200 transition-all ${
          sidebarCollapsed ? "ml-[60px]" : "ml-[232px]"
        }`}
      >
        <div className="w-11/12 mx-auto max-w-[1000px]. py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
