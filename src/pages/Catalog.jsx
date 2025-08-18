import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategory } from "../services/operations/authApi";
import { FaThLarge } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaArrowRight } from "react-icons/fa6";

function Catalog() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory(setCategories));
  }, []);

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-richblack-900 via-richblack-800 to-richblack-900 pb-16">
      <div className="relative w-11/12 mx-auto text-center py-16 px-4">
        <h1 className="text-5xl font-black mb-3 tracking-tight">
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-50 via-yellow-50 to-yellow-25"
            style={{ WebkitTextStroke: "1px #f9d423" }}
          >
            Discover&nbsp;
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-5 via-yellow-5 to-white drop-shadow-[0_6px_30px_rgba(255,222,89,0.26)]">
            Amazing Categories
          </span>
        </h1>
        <div className="mt-5 mb-2 flex justify-center">
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-yellow-50 via-yellow-25 to-yellow-5 animate-pulse opacity-90" />
        </div>
        <p className="text-richblack-200 text-lg max-w-2xl mx-auto">
          Upgrade your learning — tap a field you love and deep-dive into
          curated courses. Cutting-edge tech, easy navigation.
        </p>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] bg-gradient-to-r from-yellow-50/80 via-[#00d2ff]/60 to-[#fae100]/70 rounded-full blur-2xl opacity-40 pointer-events-none -z-10" />
      </div>

      {/* Responsive Animated Grid */}
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const coursesCount =
              category.course?.length ??
              (Array.isArray(category.course) ? category.course.length : 0);

            return (
              <Link
                key={category._id}
                to={`/catalog/${category.name
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                tabIndex={0}
                className={`
                  group relative bg-gradient-to-br shadow-lg
                  border-2 border-richblack-700 rounded-2xl p-6 min-h-[210px]
                  flex flex-col items-start  hover:shadow-xl
                  transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-50/30
                  overflow-hidden
                `}
                style={{ backgroundBlendMode: "multiply" }}
              >
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center w-full mb-4 z-10">
                  <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full mr-3 border border-white/10">
                    <FaThLarge className="text-yellow-50 text-2xl shadow-yellow-100/50 drop-shadow" />
                  </div>
                  <span className="ml-auto bg-yellow-50 text-black px-3 py-1 rounded-full font-semibold text-xs border border-yellow-50/50 shadow shadow-yellow-100/30">
                    {coursesCount} {coursesCount === 1 ? "Course" : "Courses"}
                  </span>
                </div>
                {/* Category Name */}
                <h2 className="text-2xl font-extrabold text-white mb-1 tracking-tight drop-shadow">
                  {category.name}
                </h2>
                {/* Description */}
                <p className="text-richblack-50/90 text-[15px] tracking-wide font-medium line-clamp-3 mb-2">
                  {category.description}
                </p>
                {/* Discover Link */}
                <div className="flex items-center gap-2 mt-auto pt-3 z-10">
                  <span className="inline-block text-richblack-5 font-bold text-base group-hover:underline">
                    Discover Courses
                  </span>
                  <span>
                    <FaArrowRight className="text-yellow-50" size={17} />
                  </span>
                </div>
                {/* Subtle glass/blur accent overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] rounded-2xl opacity-0 group-hover:opacity-30 pointer-events-none transition" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
