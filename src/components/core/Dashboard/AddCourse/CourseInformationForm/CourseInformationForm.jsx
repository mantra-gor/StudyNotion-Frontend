import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../../../services/operations/authApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import TagsInput from "../../../../ui/form/TagsInput";
import Upload from "../../../../ui/form/Upload";

function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      await dispatch(getAllCategory(setCourseCategories));
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tags);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const onSubmit = () => {};

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-5 mt-4"
      >
        <div className="grid gap-y-1">
          <label htmlFor="courseTitle">
            Course Title <sup className=" text-[0.725rem] text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            placeholder="Enter Course Title"
            className={`w-100 bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            {...register("courseTitle", { required: true })}
          />
          {errors.courseTitle && (
            <span className="text-pink-200 text-sm">
              Course Title is required
            </span>
          )}
        </div>
        <div className="grid gap-y-1">
          <label htmlFor="courseShortDesc">
            Course Short Description{" "}
            <sup className=" text-[0.725rem] text-pink-200">*</sup>
          </label>
          <textarea
            type="text"
            id="courseShortDesc"
            name="courseShortDesc"
            placeholder="Enter Course Short Description"
            className={`w-100 bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
            rows={3}
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            {...register("courseShortDesc", { required: true })}
          ></textarea>
          {errors.courseShortDesc && (
            <span className="text-pink-200 text-sm">
              Course Short Description is required
            </span>
          )}
        </div>
        <div className="grid gap-y-1">
          <label htmlFor="coursePrice">
            Course Price <sup className=" text-[0.725rem] text-pink-200">*</sup>
          </label>
          <div
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            className="w-full flex items-center relative bg-richblack-700 rounded-[0.5rem] text-richblack-5 shadow-richblack"
          >
            <HiOutlineCurrencyRupee
              className=" bottom-4 ml-3 opacity-70"
              size={23}
            />
            <input
              type="text"
              id="coursePrice"
              name="coursePrice"
              placeholder="Enter Course Price"
              className="w-full h-full p-[12px] bg-transparent"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.coursePrice && (
            <span className="text-pink-200 text-sm">
              Course Price is required
            </span>
          )}
        </div>
        <div className="grid gap-y-1">
          <label htmlFor="coursePrice">
            Course Category{" "}
            <sup className=" text-[0.725rem] text-pink-200">*</sup>
          </label>
          <select
            name="courseCategory"
            id="courseCategory"
            defaultValue=""
            className="w-full h-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 md:p-[12px] py-[12px] shadow-richblack"
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            {...register("courseCategory", {
              required: true,
            })}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories.map((courseCategory) => (
                <option key={courseCategory._id} value={courseCategory._id}>
                  {courseCategory.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="text-pink-200 text-sm">
              Course Category is required
            </span>
          )}
        </div>
        <TagsInput setValue={setValue} errors={errors} />
        <Upload register={register} multiple={false} />
      </form>
    </div>
  );
}

export default CourseInformationForm;
