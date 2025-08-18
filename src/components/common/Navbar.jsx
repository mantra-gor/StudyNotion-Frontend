import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "../core/auth/ProfileDropdown";
import { getAllCategory } from "../../services/operations/authApi";
import ProfileMenu from "../core/auth/ProfileMenu";

function Navbar() {
  const { accessToken } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const dispatch = useDispatch();

  const request = async () => {
    dispatch(getAllCategory(setSubLinks));
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="h-14 w-screen fixed z-50 top-0 left-0 right-0 flex items-center justify-center border-b border-richblack-700 bg-richblack-800/60 backdrop-blur-md">
      <div className="w-11/12 md:w-9/12 flex max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <img
            src={Logo}
            alt="StudyNotion Logo"
            width={150}
            height={40}
            loading="lazy"
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((item, index) => (
              <li
                key={index}
                className="relative cursor-pointer transition-all duration-200 group"
              >
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
                  <NavLink
                    to={item.path}
                    className="flex items-center justify-center relative gap-1 group"
                    onMouseEnter={() => setActiveDropdown(true)}
                    onMouseLeave={() => setActiveDropdown(false)}
                  >
                    {item.title}
                    <FaAngleDown />
                    {/* Catalog Dropdown */}
                    <div
                      className={`absolute top-[50px] -left-8 md:w-[280px] bg-richblack-800 border border-richblack-700 rounded-md shadow-lg text-sm transition-all duration-200 ${
                        activeDropdown
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
                    >
                      {subLinks?.length ? (
                        subLinks.map((category, _id) => {
                          const linkPath = category?.name
                            ?.toLowerCase()
                            ?.replace(/ /g, "-");
                          return (
                            <Link
                              key={_id}
                              to={`/catalog/${linkPath}`}
                              className="block px-4 py-2 hover:bg-richblack-700 rounded-md"
                            >
                              {category?.name}
                            </Link>
                          );
                        })
                      ) : (
                        <div className="px-4 py-2 text-richblack-400">
                          No Category Found
                        </div>
                      )}
                    </div>
                  </NavLink>
                )}
                <div className="mt-3 absolute bg-yellow-100 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Area (Cart / Auth / Profile) */}
        <div className="flex gap-x-4 items-center text-richblack-100">
          {user && user?.accountType === "Student" && (
            <Link className="relative" to="/dashboard/cart">
              <AiOutlineShoppingCart size={26} />
              {totalItems > 0 && (
                <span className="absolute text-richblack-5 -top-1 -right-2 bg-caribbeangreen-400 px-[6px] py-[1px] font-bold text-xs rounded-full animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-3">
            {accessToken === null ? (
              <>
                <Link
                  to="/login"
                  className="bg-richblack-700 text-richblack-100 px-4 py-2 rounded-md hover:bg-richblack-600 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-50 text-black px-4 py-2 rounded-md hover:brightness-95 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-richblack-25 text-2xl"
            onClick={() => setMobileMenuOpen(true)}
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 w-full h-full bg-black md:hidden">
          <div className="absolute top-0 right-0 left-0 bottom-0 h-screen w-full bg-richblack-900 border-l border-richblack-700 p-4 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <img src={Logo} alt="Logo" className="w-[150px]" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-richblack-25 text-xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Links */}
            <nav className="">
              <ul className="flex flex-col gap-6 text-richblack-25 p-2">
                {NavbarLinks.map((item, idx) => (
                  <li key={idx}>
                    {item.title !== "Catalog" ? (
                      <NavLink
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          isActive
                            ? "text-yellow-25 font-semibold"
                            : "hover:text-yellow-25"
                        }
                      >
                        {item.title}
                      </NavLink>
                    ) : (
                      <details className="group cursor-pointer">
                        <summary className="flex items-center justify-between hover:text-yellow-25">
                          Catalog <FaAngleDown className="ml-1" />
                        </summary>
                        <ul className="ml-4 mt-2 flex flex-col gap-2 text-sm">
                          {subLinks?.length ? (
                            subLinks.map((category, i) => {
                              const linkPath = category?.name
                                ?.toLowerCase()
                                ?.replace(/ /g, "-");
                              return (
                                <Link
                                  key={i}
                                  to={`/catalog/${linkPath}`}
                                  className="hover:text-yellow-25"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {category?.name}
                                </Link>
                              );
                            })
                          ) : (
                            <li className="text-richblack-400">
                              No Category Found
                            </li>
                          )}
                        </ul>
                      </details>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Auth / Profile */}
            <div className="mt-auto pt-6 p-2 border-t border-richblack-700 flex flex-col gap-3">
              {accessToken === null ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="bg-richblack-700 text-richblack-100 px-4 py-2 text-center rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-yellow-50 text-black px-4 py-2 text-center rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div>
                  <ProfileMenu setMobileMenuOpen={setMobileMenuOpen} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
