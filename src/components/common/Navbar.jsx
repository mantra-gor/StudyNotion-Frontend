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
      // console.log(res.data);
      setSubLinks(res.data);
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

        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((item, index) => (
              <li
                key={index}
                className="relative cursor-pointer transition-all duration-200 group"
              >
                <>
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
                    <div className="flex items-center justify-center relative gap-1 group">
                      {item.title}
                      <FaAngleDown />

                      <div
                        className="invisible md:w-[300px] -left-8 absolute top-[50px] flex flex-col rounded-md 
                    bg-richblack-800 p-2 text-richblack-50 opacity-0 transition-all duration-200 
                    group-hover:visible group-hover:opacity-100 drop-shadow-white-lg z-30"
                      >
                        {subLinks?.length ? (
                          subLinks.map((category, _id) => {
                            const linkPath = category?.name
                              ?.toLowerCase()
                              ?.replace(/ /g, "-");
                            return (
                              <Link
                                key={_id}
                                className="p-3 hover:bg-richblack-700 rounded-md"
                                to={linkPath}
                              >
                                <div>{category?.name}</div>
                              </Link>
                            );
                          })
                        ) : (
                          <div>No Category Found</div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="mt-3 absolute bg-yellow-100 w-full h-1 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </>
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
                className="bg-richblack-800 text-richblack-100 border border-richblack-700
                py-[8px] px-[12px] rounded-[8px] active:bg-opacity-80"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-richblack-800 text-richblack-100 border border-richblack-700
                py-[8px] px-[12px] rounded-[8px] active:bg-opacity-80"
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
