import { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";

function CourseCard({ course, classname }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingsAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link
      className={`group block p-2 ${classname}`}
      to={`/course/${course._id}`}
    >
      <div className="relative bg-gradient-to-br from-richblack-800 to-richblack-900 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-richblack-700 hover:border-richblack-600">
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-caribbeangreen-500/5 to-richblue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={course.thumbnailInfo.objectUrl}
            alt={`${course.title} thumbnail`}
            loading="lazy"
            className="w-full h-52 object-cover transition-all duration-300 ease-in-out group-hover:scale-110 brightness-90 group-hover:brightness-100"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/80 via-richblack-800/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-richblack-800/60 backdrop-blur-md text-caribbeangreen-200 px-3 py-1.5 rounded-full text-xs font-semibold border border-caribbeangreen-300/30 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-caribbeangreen-200 rounded-full animate-pulse"></div>
              Self Paced
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative p-6 space-y-4">
          {/* Course Title */}
          <h4 className="text-xl font-bold text-richblack-5 leading-tight">
            {course.title}
          </h4>

          {/* Instructor Info - Enhanced */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.firstName + `avatar`}
              />
            </div>
            <div>
              <p className="text-richblack-25 text-sm font-semibold">
                {course.instructor.firstName} {course.instructor.lastName}
              </p>
              <p className="text-richblack-200 text-xs">Course Instructor</p>
            </div>
          </div>

          {/* Rating Section - Enhanced */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-50 font-bold text-base">
                  {avgReviewCount}
                </span>
                <RatingStars Review_Count={avgReviewCount} />
              </div>
              <span className="text-richblack-200 text-sm font-medium">
                ({course?.ratingsAndReviews?.length || 0} reviews)
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-richblack-500 to-transparent"></div>
        </div>

        {/* Bottom Action Bar */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between p-4 bg-richblack-800/30 backdrop-blur-sm rounded-xl border border-richblack-600/30">
            <div className="flex items-center space-x-2 text-richblack-100">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Lifetime Access</span>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">
                ₹{course.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
