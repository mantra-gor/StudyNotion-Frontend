import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CourseCard from "./CourseCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

function CourseSlider({
  courses,
  title,
  subtitle,
  autoplay = false,
  className = "",
}) {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Header Section */}
      {(title || subtitle) && (
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            {title && (
              <h2 className="text-2xl lg:text-3xl font-bold text-white bg-gradient-to-r from-white to-richblack-200 bg-clip-text text-transparent">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-richblack-200 text-sm lg:text-base max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Custom Navigation Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="group w-12 h-12 bg-richblack-700 hover:bg-richblack-600 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg border border-richblack-600"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-richblack-200 group-hover:text-white transition-colors duration-200" />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              className="group w-12 h-12 bg-richblack-700 hover:bg-richblack-600 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg border border-richblack-600"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-richblack-200 group-hover:text-white transition-colors duration-200" />
            </button>
          </div>
        </div>
      )}

      {/* Course Counter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-richblack-800 px-4 py-2 rounded-full border border-richblack-700">
            <span className="text-richblack-200 text-sm font-medium">
              {courses?.length || 0}{" "}
              {courses?.length === 1 ? "Course" : "Courses"} Available
            </span>
          </div>
          {courses?.length > 0 && (
            <div className="hidden sm:flex items-center space-x-2 text-caribbeangreen-200">
              <div className="w-2 h-2 bg-caribbeangreen-200 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Updated Recently</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      {!courses || courses?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 bg-richblack-700 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-richblack-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                clipRule="evenodd"
              />
              <path d="M8 6h4v2H8V6zM8 10h4v2H8v-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Courses Found
          </h3>
          <p className="text-richblack-300 text-center max-w-md">
            We couldn't find any courses at the moment. Check back later or
            explore other categories.
          </p>
          <button className="mt-6 bg-gradient-to-r from-blue-600 to-richblue-600 hover:from-blue-500 hover:to-richblue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg">
            Browse All Categories
          </button>
        </div>
      ) : (
        <div className="relative">
          <Swiper
            onSwiper={setSwiperRef}
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={1}
            freeMode={true}
            autoplay={
              autoplay
                ? {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={courses.length > 3}
            grabCursor={true}
            className="!pb-12"
          >
            {courses?.map((course, index) => (
              <SwiperSlide key={course._id || index} className="h-auto">
                <div className="h-full">
                  <CourseCard course={course} classname="h-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex justify-center mt-6 space-x-3">
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="w-10 h-10 bg-richblack-700 hover:bg-richblack-600 rounded-full flex items-center justify-center transition-all duration-300 border border-richblack-600"
              aria-label="Previous slide"
            >
              <FaChevronLeft size={14} className="text-richblack-200" />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              className="w-10 h-10 bg-richblack-700 hover:bg-richblack-600 rounded-full flex items-center justify-center transition-all duration-300 border border-richblack-600"
              aria-label="Next slide"
            >
              <FaChevronRight size={14} className="text-richblack-200" />
            </button>
          </div>
        </div>
      )}

      {/* Statistics Bar */}
      {courses?.length > 0 && (
        <div className="mt-8 p-4 bg-richblack-800/30 backdrop-blur-sm rounded-xl border border-richblack-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-white font-bold text-lg">{courses.length}</p>
                <p className="text-richblack-300 text-xs">Total Courses</p>
              </div>
              <div className="w-px h-8 bg-richblack-600"></div>
              <div className="text-center">
                <p className="text-caribbeangreen-200 font-bold text-lg">
                  {
                    courses.filter(
                      (course) => course.ratingsAndReviews?.length > 0
                    ).length
                  }
                </p>
                <p className="text-richblack-300 text-xs">Rated Courses</p>
              </div>
              <div className="w-px h-8 bg-richblack-600"></div>
              <div className="text-center">
                <p className="text-blue-200 font-bold text-lg">
                  ₹
                  {Math.min(
                    ...courses.map((course) => course.price)
                  ).toLocaleString()}
                </p>
                <p className="text-richblack-300 text-xs">Starting Price</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-yellow-50">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">Premium Collection</span>
            </div>
          </div>
        </div>
      )}
      <br />
      <hr className="text-richblack-500" />
    </div>
  );
}

export default CourseSlider;
