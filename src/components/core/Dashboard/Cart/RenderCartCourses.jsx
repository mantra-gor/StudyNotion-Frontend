import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { MdDelete, MdOutlineOndemandVideo } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaUsers, FaGlobe } from "react-icons/fa";
import { removeFromCart } from "../../../../redux/slices/cartSlice";
import { useState } from "react";

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [removingItems, setRemovingItems] = useState(new Set());

  const handleRemoveFromCart = async (courseId) => {
    setRemovingItems((prev) => new Set(prev).add(courseId));

    setTimeout(() => {
      dispatch(removeFromCart(courseId));
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(courseId);
        return newSet;
      });
    }, 300);
  };

  const getAverageRating = (course) => {
    if (!course.ratingsAndReviews || course.ratingsAndReviews.length === 0) {
      return 4.6; // Default rating for display
    }
    const total = course.ratingsAndReviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    return (total / course.ratingsAndReviews.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-richblack-800 rounded-lg border border-richblack-700 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Course Details</h2>
          <span className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-sm font-medium">
            {cart.length} Item{cart.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-richblack-800 rounded-lg border border-richblack-700 divide-y divide-richblack-700">
        {cart.map((course, index) => {
          const averageRating = getAverageRating(course);
          const isRemoving = removingItems.has(course._id);

          return (
            <div
              key={index}
              className={`p-6 transition-all duration-300 ${
                isRemoving ? "opacity-50" : "opacity-100"
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Course Image */}
                <div className="flex-shrink-0">
                  <img
                    src={course?.thumbnailInfo?.objectUrl}
                    alt="Course thumbnail"
                    className="w-32 h-20 rounded-lg object-cover border border-richblack-600"
                  />
                </div>

                {/* Course Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white line-clamp-2">
                      {course?.courseName || course?.title}
                    </h3>
                    <p className="text-richblack-300 text-sm mt-1">
                      By{" "}
                      {course?.instructor?.firstName +
                        " " +
                        course?.instructor?.lastName}
                    </p>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center space-x-6 text-sm text-richblack-400">
                    <div className="flex items-center space-x-1">
                      <FaUsers size={12} />
                      <span>
                        {course?.studentsEnrolled?.length || 0} students
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaGlobe size={12} />
                      <span>{course?.language || "Hindi"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MdOutlineOndemandVideo />
                      <span>Self paced</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <span className="bg-yellow-25 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                      New
                    </span>
                    <ReactStars
                      count={5}
                      value={parseFloat(averageRating)}
                      size={16}
                      edit={false}
                      activeColor={"#ffd700"}
                      color={"#6B7280"}
                      emptyIcon={<AiOutlineStar />}
                      fullIcon={<AiFillStar />}
                    />
                    <span className="text-richblack-400 text-sm">
                      ({course?.ratingsAndReviews?.length || 0} reviews)
                    </span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex flex-col items-end space-y-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      ₹{course?.price?.toLocaleString()}
                    </div>
                    <p className="text-richblack-400 text-sm">
                      One-time payment
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(course._id)}
                    disabled={isRemoving}
                    className="flex items-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <MdDelete size={16} />
                    <span>{isRemoving ? "Removing..." : "Remove"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RenderCartCourses;
