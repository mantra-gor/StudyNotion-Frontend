import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../../../services/operations/authApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import TagsInput from "../../../../ui/form/TagsInput";
import Upload from "../../../../ui/form/Upload";
import Button from "../../../../ui/Button";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { COURSES_STATUSES } from "../../../../../utils/constants";
import {
  addCourse,
  updateCourse,
} from "../../../../../services/operations/courseDetailsApi";
import KeyFeatures from "./KeyFeatures";
import { uploadToS3 } from "../../../../../services/aws/s3Services";
import Spinner from "../../../../ui/spinner/Spinner";

function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [thumbnailMeta, setThumbnailMeta] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);

  toast.error("ERROR");

  // Fetch categories and set initial form values if editing
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      dispatch(getAllCategory(setCourseCategories));
      setLoading(false);
    };

    const initializeFormValues = () => {
      if (!editCourse) return;
      const fields = [
        "title",
        "description",
        "price",
        "tags",
        "keyFeatures",
        "category",
        "file",
        "language",
      ];
      fields.forEach((field) => setValue(field, course[field]));
    };

    fetchCategories();
    initializeFormValues();
  }, [dispatch, editCourse, setValue, course]);

  // Check if form data has changed
  const isFormUpdated = useCallback(() => {
    const currentValues = getValues();
    return [
      "title",
      "description",
      "price",
      "tags",
      "keyFeatures",
      "category",
      "file",
      "language",
    ].some(
      (field) =>
        JSON.stringify(currentValues[field]) !== JSON.stringify(course[field])
    );
  }, [getValues, course]);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!thumbnailMeta) {
        return toast.error("Please upload a thumbnail");
      }

      // upload file to s3
      const { uploadResponse, fileKey } = await uploadToS3(
        thumbnailMeta,
        data.file,
        "thumbnail"
      );
      if (uploadResponse.status !== 200) {
        return toast.error("Failed to upload file!");
      }

      const fileData = new FormData();

      let payload = {};
      if (editCourse) {
        if (!isFormUpdated()) return toast.error("No changes detected.");
        // Add only changed fields to FormData
      } else {
        // eslint-disable-next-line no-unused-vars
        const { file, ...restOfData } = data;
        payload = {
          ...restOfData,
          fileKey,
          status: COURSES_STATUSES.DRAFT,
        };
      }

      const result = editCourse
        ? await updateCourse(payload, fileData)
        : await addCourse(payload, payload);
      setLoading(false);

      if (result?.success) {
        dispatch(setStep(2));
        dispatch(setCourse(result));
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="w-full min-h-[400px] flex items-center">
          <Spinner />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-5 mt-4"
        >
          <h2 className="text-xl font-semibold">Course Information</h2>
          <div className="grid gap-y-1">
            <label htmlFor="title">
              Course Title{" "}
              <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Course Title"
              className={`w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
              style={{
                boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
              }}
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-pink-200 text-sm">
                Course Title is required
              </span>
            )}
          </div>
          <div className="grid gap-y-1">
            <label htmlFor="description">
              Course Short Description{" "}
              <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Enter Course Short Description"
              rows={3}
              className={`w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
              style={{
                boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
              }}
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-pink-200 text-sm">
                Course Short Description is required
              </span>
            )}
          </div>
          <div className="grid gap-y-1">
            <label htmlFor="price">
              Course Price{" "}
              <sup className=" text-[0.725rem] text-pink-200">*</sup>
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
                id="price"
                name="price"
                placeholder="Enter Course Price"
                className="w-full h-full p-[12px] bg-transparent"
                {...register("price", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.price && (
              <span className="text-pink-200 text-sm">
                Course Price is required
              </span>
            )}
          </div>
          <div className="grid gap-y-1">
            <label htmlFor="language">
              Language <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="language"
              name="language"
              placeholder="Enter Course Language"
              className={`w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
              style={{
                boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
              }}
              {...register("language", { required: true })}
            />
            {errors.title && (
              <span className="text-pink-200 text-sm">
                Course Title is required
              </span>
            )}
          </div>
          <div className="grid gap-y-1">
            <label htmlFor="category">
              Course Category{" "}
              <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </label>
            <select
              name="category"
              id="category"
              defaultValue=""
              className="w-full h-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 md:p-[12px] py-[12px] shadow-richblack"
              style={{
                boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
              }}
              {...register("category", {
                required: true,
              })}
            >
              <option value="" disabled>
                Choose a Category
              </option>
              {!loading &&
                courseCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            {errors.category && (
              <span className="text-pink-200 text-sm">
                Course Category is required
              </span>
            )}
          </div>
          <TagsInput setValue={setValue} errors={errors} />
          <Upload
            label="Course Thumbnail"
            register={register}
            name="file"
            setValue={setValue}
            multiple={false}
            errors={errors}
            fileState={setThumbnailMeta}
          />
          {/* <div className="grid gap-y-1">
          <label>
            Benifits of the course{" "}
            <sup className=" text-[0.725rem] text-pink-200">*</sup>
          </label>
          <textarea
            name="keyFeatures"
            id="keyFeatures"
            placeholder="Enter Benifits of the course"
            {...register("keyFeatures", { required: true })}
            className={`w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
          ></textarea>
          {errors.keyFeatures && (
            <span className="text-pink-200 text-sm">
              Course Benifits is required
            </span>
          )}
        </div> */}
          <KeyFeatures
            name="keyFeatures"
            label="Key Features"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
          <div className="w-full flex gap-4 items-center justify-end">
            {editCourse && (
              <Button
                type="button"
                className="!bg-richblack-700 w-1/2"
                onClick={() => dispatch(setStep(2))}
              >
                Continue without saving
              </Button>
            )}
            <Button type="submit" active={true} className="w-1/3">
              {editCourse ? "Save Changes" : "Next"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CourseInformationForm;
