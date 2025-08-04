import * as Icons from "react-icons/vsc";
import { NavLink } from "react-router-dom";

function SidebarLink({ data, sidebarCollapsed }) {
  const Icon = Icons[data.icon];
  return (
    <NavLink
      to={data.path}
      className={({ isActive }) =>
        `flex gap-2 justify-start items-center p-2 pl-4 transition-all duration-200
      ${
        isActive
          ? "text-yellow-50 bg-yellow-800 border-l-[2.65px] border-yellow-50 pl-5"
          : "text-richblack-300"
      }`
      }
    >
      <div>{<Icon size={22} />}</div>
      {!sidebarCollapsed && <div>{data?.name}</div>}
    </NavLink>
  );
}

export default SidebarLink;
