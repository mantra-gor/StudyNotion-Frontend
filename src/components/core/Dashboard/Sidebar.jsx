import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import Spinner from "../../ui/spinner/Spinner";
import SidebarLink from "./SidebarLink";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { LogoutConfirmationContext } from "../../../context/LogoutConfirmationContext";
import { AiOutlineLogout } from "react-icons/ai";

function Sidebar() {
  const { setLogoutModalOpen } = useContext(LogoutConfirmationContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const isSidebarCollapsed =
      localStorage.getItem("sidebarCollapsed") === "true";
    return isSidebarCollapsed ?? window.innerWidth <= 768;
  });
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

  const handleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => {
      localStorage.setItem("sidebarCollapsed", !prev);
      return !prev;
    });
  };

  return (
    <div className="bg-richblack-800/50 backdrop-blur-lg fixed h-screen left-0">
      <div
        className={`flex h-full flex-col border-r border-r-richblack-700 relative ${
          sidebarCollapsed ? "w-[60px]" : "w-[80vw] md:max-w-[232px]"
        }`}
      >
        <button
          className={` ${
            sidebarCollapsed
              ? "flex justify-center items-center h-8 w-8 mx-auto my-3 rotate-180"
              : "absolute m-1"
          } border-2 border-richblack-300 right-0 bg-richblack-700 hover:bg-yellow-100 rounded-full group opacity-30 hover:opacity-100 duration-200`}
          onClick={handleSidebarCollapse}
        >
          <TbLayoutSidebarLeftCollapse
            className="text-richblack-200 m-1 cursor-pointer group-hover:text-richblack-500"
            size={21}
          />
        </button>
        <div className="flex flex-col w-full">
          {sidebarLinks.map((link) => {
            if (link.type == user?.accountType || !link.type) {
              return (
                <SidebarLink
                  key={link.id}
                  sidebarCollapsed={sidebarCollapsed}
                  data={link}
                />
              );
            }
          })}
          <div className="w-10/12 mx-auto h-[1px] bg-richblack-700 my-4" />
          <SidebarLink data={Settings} sidebarCollapsed={sidebarCollapsed} />
        </div>
        <button
          onClick={() => setLogoutModalOpen(true)}
          className="flex gap-2 justify-start items-center p-2 pl-[0.9rem] text-richblack-300 transition-all duration-200"
        >
          <AiOutlineLogout size={24} />
          {!sidebarCollapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
