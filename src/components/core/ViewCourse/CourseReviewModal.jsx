import { IoMdClose } from "react-icons/io";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import {
  createRating,
  fetchMyReview,
} from "../../../services/operations/courseDetailsApi";
import RatingStars from "../../common/RatingStars";
import CircularSpinner from "../../ui/spinner/CircularSpinner";

function CourseReviewModal({ setReviewModal }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const [starRating, setStarRating] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isRatingLocked, setIsRatingLocked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const closeModal = () => {
    setReviewModal(false);
  };

  const ratingChange = (newRating) => {
    setValue("courseRating", newRating);
  };

  useEffect(() => {
    const setRatingAndReview = async () => {
      setInitialLoading(true);
      await fetchMyReview({ courseID: courseEntireData._id })
        .then((res) => {
          setValue("courseExperience", res.data.review);
          setValue("courseRating", res.data.rating);
          setStarRating(res.data.rating);
          setIsRatingLocked(true);
        })
        .catch((error) => {
          console.log(error);
          setValue("courseExperience", "");
          setValue("courseRating", 0);
        });
      setInitialLoading(false);
    };
    setRatingAndReview();
  }, []);

  const submitHandler = async (data) => {
    await createRating({
      courseID: courseEntireData._id,
      rating: data.courseRating,
      review: data.courseExperience,
    });

    setReviewModal(false);
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm h-screen w-screen fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-10/12 md:w-5/12 rounded-xl overflow-hidden relative">
        <header className="bg-richblack-600 w-full py-3 px-6 flex items-center justify-between text-richblack-5">
          <h2 className="text-2xl font-semibold">
            {initialLoading
              ? "Review"
              : isRatingLocked
              ? "Your Review"
              : "Add Review"}
          </h2>
          <button
            onClick={closeModal}
            disabled={loading}
            className="hover:bg-richblack-400 p-1 rounded-full transition-all duration-300"
          >
            <IoMdClose size={28} />
          </button>
        </header>
        {initialLoading ? (
          <div className="w-full h-[400px] flex justify-center items-center p-5 bg-richblack-800">
            <CircularSpinner />
          </div>
        ) : (
          <div className="w-full p-5 bg-richblack-800 overflow-y-auto">
            <div className="flex justify-center items-center gap-4">
              <img
                src={user.avatar}
                alt={user.firstName}
                className="aspect-square w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-richblack-5 text-xl font-semibold">
                  {user?.firstName + " " + user?.lastName}{" "}
                </p>
                <p className="text-richblack-100 text-sm text-center">
                  {isRatingLocked ? "Posted Publicly" : "Posting Publicly"}
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="grid gap-y-4 p-1"
            >
              <div className="w-full flex justify-center items-center mt-4 mb-2">
                {isRatingLocked ? (
                  <RatingStars
                    Review_Count={parseInt(starRating)}
                    Star_Size={30}
                  />
                ) : (
                  <ReactStars count={5} onChange={ratingChange} size={24} />
                )}
              </div>

              <div className="text-richblack-5">
                <label htmlFor="courseExperience">
                  Add Your Experience
                  <sup className="text-[0.725rem] text-pink-200">*</sup>
                </label>
                <textarea
                  type="text"
                  id="courseExperience"
                  name="courseExperience"
                  placeholder="Write a review..."
                  rows={3}
                  disabled={isRatingLocked}
                  className={`mt-2 w-full bg-richblack-700 rounded-[0.5rem]  p-[12px] shadow-richblack disabled:cursor-not-allowed ${
                    isRatingLocked ? "text-richblack-50" : "text-richblack-5"
                  }`}
                  style={{
                    boxShadow:
                      "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
                  }}
                  {...register("courseExperience", { required: true })}
                ></textarea>
                {errors.courseExperience && (
                  <span>Please add your experience.</span>
                )}
              </div>
              {!isRatingLocked && (
                <Button type="submit" active={true} disabled={loading}>
                  Submit
                </Button>
              )}
            </form>
            <div className="flex justify-center text-center items-center mt-4 mb-2 text-yellow-400 font-semibold">
              {isRatingLocked ? (
                <p>
                  Note: Rating and reviewing is a one-time action. You've
                  already submitted yours.
                </p>
              ) : (
                <p>
                  Important: Your feedback is permanent and cannot be updated
                  once posted.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseReviewModal;
