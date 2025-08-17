import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../ui/Button";
import {
  resetCourseState,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import { COURSES_STATUSES } from "../../../../../utils/constants";
import { updateCourse } from "../../../../../services/operations/courseDetailsApi";
import { useNavigate } from "react-router-dom";

function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSES_STATUSES.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const submitHandler = async (data) => {
    if (
      (course?.status === COURSES_STATUSES.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSES_STATUSES.DRAFT &&
        getValues("public") === false)
    ) {
      // no updation in form; so no need to call API
      return goToCourses();
    }

    // if course is updated
    const payload = {
      courseID: course?._id,
      status: getValues("public")
        ? COURSES_STATUSES.PUBLISHED
        : COURSES_STATUSES.DRAFT,
    };

    setLoading(true);

    const result = await updateCourse(payload);
    if (result.success) {
      goToCourses();
    }
    setLoading(false);
  };

  return (
    <div className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-5 mt-4">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <h2 className="text-xl font-semibold">Publish Course</h2>
        <div className="grid gap-y-5">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              className="h-5 w-5"
              id="public"
              {...register("public")}
            />
            <label htmlFor="public">
              Make this course as public.{" "}
              {/* <sup className="text-[0.725rem] text-pink-200">*</sup> */}
            </label>
          </div>
          <div className="w-full flex gap-4 items-center justify-end">
            <Button
              type="button"
              disabled={loading}
              className="!bg-richblack-700 w-1/5"
              onClick={goBack}
            >
              Back
            </Button>
            <Button
              active
              type="submit"
              disabled={loading}
              loading={loading}
              className="w-1/5 flex items-center justify-center gap-2 !px-3"
            >
              Publish
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PublishCourse;
