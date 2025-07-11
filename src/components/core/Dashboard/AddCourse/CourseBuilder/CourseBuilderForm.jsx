import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbEditCircle } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsApi";
import Button from "../../../../ui/Button";
import NestedView from "./NestedView";

function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const course = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goNext = () => {
    if (course.course.courseContent.length === 0) {
      return toast.error("Please add atleast one section");
    }
    if (
      course.course.courseContent.some(
        (section) => section.subSection.length === 0
      )
    ) {
      return toast.error("Please add atleast one lecture in each section");
    }
    dispatch(setStep(3));
  };

  const handleChangeEditScetionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      return cancelEdit();
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const submitHandler = async (data) => {
    let result;
    console.log(course);

    setLoading(true);
    if (editSectionName) {
      result = await updateSection({
        sectionName: data.sectionName,
        sectionID: editSectionName,
        courseID: course.course._id,
        // courseID: "68091bdde2485bf4f17f5fbe", // !testing only
      });
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseID: course.course._id,
        // courseID: "68091bdde2485bf4f17f5fbe", // !testing only
      });
    }
    // update the values
    if (result.success) {
      dispatch(setCourse(result.data));
      setEditCourse(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  return (
    <div className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-5 mt-4">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <h2 className="text-xl font-semibold">Course Builder</h2>
        <div className="grid gap-y-1">
          <label htmlFor="sectionName">
            Section Name <sup className="text-[0.725rem] text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            name="sectionName"
            placeholder="Add a section"
            className={`w-full bg-richblack-700 rounded-lg text-richblack-5 p-[12px] shadow-richblack`}
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            {...register("sectionName", { required: true })}
          />
          {errors.sectionName && (
            <span className="text-pink-200 text-sm">
              Section Name is required
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="border rounded-lg border-yellow-50 bg-richblack-700/40 py-2 px-4 flex justify-center items-center gap-1 hover:brightness-105
            active:brightness-110 transition-all duration-200 hover:shadow-2xl text-yellow-50"
            type="submit"
          >
            {editSectionName ? (
              <>
                <TbEditCircle size={19} />
                <p>Edit Section Name</p>
              </>
            ) : (
              <>
                <IoIosAddCircleOutline size={19} />
                <p>Create Section</p>
              </>
            )}
          </button>
          {editSectionName && (
            <button
              type="button"
              onSubmit={cancelEdit}
              className="border rounded-lg border-pink-400 bg-richblack-700/40 py-2 px-4 flex justify-center items-center gap-1 hover:brightness-105
              active:brightness-110 transition-all duration-200 hover:shadow-2xl text-pink-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {course?.course?.courseContent?.length >= 0 && (
        <NestedView handleChangeEditScetionName={handleChangeEditScetionName} />
      )}
      <div className="w-full flex gap-4 items-center justify-end">
        <Button
          type="button"
          className="!bg-richblack-700 w-1/5"
          onClick={goBack}
        >
          Back
        </Button>
        <Button
          active={true}
          onClick={goNext}
          className="w-1/5 flex items-center justify-center gap-2 !px-3"
        >
          Next
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default CourseBuilderForm;
