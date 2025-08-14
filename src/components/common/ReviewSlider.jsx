import { useEffect, useState } from "react";
import { fetchAllReviews } from "../../services/operations/courseDetailsApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { formatDate } from "../../utils/dateFormatter";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import RatingStars from "./RatingStars";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const setReviewsData = async () => {
      try {
        const response = await fetchAllReviews();
        if (response?.data) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    setReviewsData();
  }, []);

  return (
    <div className="w-full py-12 bg-richblack-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 md:text-center">
          <h2 className="text-4xl font-bold text-white">
            What Our Students Say
          </h2>
          <p className="text-richblack-300 mt-2">
            Hear genuine feedback from learners across various courses
          </p>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={reviews.length > 3}
          grabCursor={true}
          className="pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="bg-richblack-800 min-h-[275px] border border-richblack-700 rounded-xl p-6 h-full flex flex-col justify-between hover:border-richblack-600 transition-all duration-300">
                {/* User Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={review.user.avatar}
                    alt={`${review.user.firstName} ${review.user.lastName}`}
                    loading="lazy"
                    className="w-12 h-12 rounded-full border border-richblack-600 object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">
                      {review.user.firstName} {review.user.lastName}
                    </h4>
                    <p className="text-richblack-400 text-sm">
                      {formatDate(new Date(review.createdAt))}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <RatingStars Review_Count={review.rating} Star_Size={24} />
                  <span className="ml-2 mt-1 text-yellow-100 font-semibold">
                    {review.rating.toFixed(1)}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-richblack-200 text-sm mb-4 line-clamp-4">
                  {review.review}
                </p>

                {/* Course Info */}
                <div className="mt-auto pt-4 border-t border-richblack-700">
                  <p className="text-xs text-richblack-400">Course:</p>
                  <p className="text-richblack-100 font-medium truncate">
                    {review.course.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
