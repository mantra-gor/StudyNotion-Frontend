import Navbar from "../../common/Navbar";
import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default BlankLayout;
