import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import ProfileDropdown from "../core/auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalCartItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState(null);

  const request = async () => {
    try {
      const res = await apiConnector("GET", "/course/get-all-category");
      console.log(res);
      setSubLinks(res.data.data);
    } catch (error) {
      console.error("Couldn't fetch the category list: ", error);
    }
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="flex h-14 items-center justify-center border-b border-richblack-700">
      <div className="w-9/12 flex max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img
            src={Logo}
            alt="StudyNotion Logo"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((item, index) => (
              <li key={index}>
                {item.title !== "Catalog" ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-25" : "text-richblack-25"
                    }
                  >
                    {item.title}
                  </NavLink>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {item.title}
                    <FaAngleDown />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType === "Student" && (
            <Link to="/dashboard/cart">
              <AiOutlineShoppingCart />
              {totalCartItems > 0 && <span>{totalCartItems}</span>}
            </Link>
          )}
          {token === null && (
            <div className=" flex gap-4">
              <Link
                to="/login"
                className="text-richblack-200 bg-richblack-800 border-richblack-700 px-3 py-2 rounded-md"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-richblack-200 bg-richblack-800 border-richblack-700 px-3 py-2 rounded-md"
              >
                Sign Up
              </Link>
            </div>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
