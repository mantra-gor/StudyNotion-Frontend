import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { FaAngleDown } from "react-icons/fa";

function Navbar() {
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

        <div className="flex gap-x-4 items-center"></div>
      </div>
    </div>
  );
}

export default Navbar;
