import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsApi";
import {
  setCourse,
  setSubSection,
} from "../../../../../redux/slices/courseSlice";
import { IoMdClose } from "react-icons/io";
import Upload from "../../../../ui/form/Upload";
import Button from "../../../../ui/Button";
import { uploadToS3 } from "../../../../../services/aws/s3Services";
import toast from "react-hot-toast";

function LectureModal({
  modalData,
  setModalData,
  edit = false,
  add = false,
  view = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [videoMeta, setVideoMeta] = useState(null);
  const { course } = useSelector((state) => state.course);

  const courseContentIndex = modalData.courseContentIndex;

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.lectureDesc ||
      currentValues.lectureVideo !== modalData.lectureVideo
    ) {
      return true;
    } else {
      console.log("Form not updated");
      toast.error("Form not updated");
      return false;
    }
  };

  // const handleEditSubSection = async () => {
  //   const currentValues = getValues();
  //   const formData = new FormData();

  //   console.log(modalData);

  //   // subSectionID, title, description, duration videoFile
  //   formData.append("subSectionID", modalData._id);
  //   formData.append("title", modalData.title);
  //   formData.append("description", modalData.description);
  //   formData.append("videoFile", modalData._id);
  //   // formData.append("duration", modalData._id);

  //   if (currentValues.lectureTitle !== modalData.title) {
  //     formData.append("title", modalData._id);
  //   }
  //   if (currentValues.lectureDesc !== modalData.description) {
  //     formData.append("description", modalData.description);
  //   }
  //   if (currentValues.lectureVideo !== modalData.videoFile) {
  //     formData.append("videoFile", modalData.videoFile);
  //   }
  //   // if (currentValues.lectureTitle !== modalData.duration) {
  //   //   formData.append("duration", modalData.duration);
  //   // }

  //   setLoading(true);
  //   const result = await updateSubSection(formData);
  //   if (result.success) {
  //     const updatedCourse = course;
  //     updatedCourse.courseContent[courseContentIndex] = result.data;
  //     console.log(updatedCourse);
  //     dispatch(setCourse(result.data));
  //   }
  //   closeModal();
  // };

  const handleEditSubSection = async () => {
    try {
      const currentValues = getValues();
      const payload = {
        sectionID: modalData.sectionID,
        subSectionID: modalData._id,
        title: modalData.title,
        description: modalData.description,
      };

      // Only include fields if they have changed
      if (currentValues.lectureTitle !== modalData.title) {
        payload.title = currentValues.lectureTitle;
      }
      if (currentValues.lectureDesc !== modalData.description) {
        payload.description = currentValues.lectureDesc;
      }
      if (
        currentValues.lectureVideo &&
        currentValues.lectureVideo !== modalData.videoFile
      ) {
        payload.videoFile = currentValues.lectureVideo; // Make sure this is correct
      }
      if (
        currentValues.lectureDuration &&
        currentValues.lectureDuration !== modalData.duration
      ) {
        payload.duration = currentValues.lectureDuration;
      }

      setLoading(true);

      const result = await updateSubSection(payload);

      if (result.success) {
        // Update the course content in the Redux store
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData.sectionID ? result.data : section
        );
        const updatedCourse = {
          ...course,
          courseContent: updatedCourseContent,
        };
        dispatch(setCourse(updatedCourse));
      }
    } catch (error) {
      console.error("Failed to edit subsection:", error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const submitHandler = async (data) => {
    // handle view
    if (view) return;

    // handle edit
    if (edit) {
      if (!isFormUpdated) return;
      else {
        handleEditSubSection();
        return;
      }
    }

    // handle add

    // upload file to s3
    setLoading(true);
    const { uploadResponse, fileKey } = await uploadToS3(
      videoMeta,
      data.lectureVideo,
      "course"
    );
    if (uploadResponse.status !== 200) {
      return toast.error("Failed to upload file!");
    }

    // now adding the data without the formdata
    const payload = {
      sectionID: modalData.sectionID,
      title: data.lectureTitle,
      description: data.lectureDesc,
      fileKey: fileKey,
    };

    const result = await createSubSection(payload);
    if (result.success) {
      dispatch(
        setSubSection({
          courseContentIndex,
          subsection: result.data,
        })
      );
    }
    closeModal();
  };

  const closeModal = () => {
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm h-screen w-screen fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-10/12 md:w-6/12 rounded-xl overflow-hidden relative">
        <header className="bg-richblack-600 w-full py-3 px-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {edit ? "Edit" : view ? "View" : add ? "Add" : ""} Lecture
          </h2>
          <button
            onClick={closeModal}
            disabled={loading}
            className="hover:bg-richblack-400 p-1 rounded-full transition-all duration-300"
          >
            <IoMdClose size={28} />
          </button>
        </header>
        <div
          className="w-full p-8 bg-richblack-800 overflow-y-auto"
          style={{ maxHeight: "80vh" }} // Constrain height for scrollable content
        >
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="grid gap-y-4 p-1"
          >
            <Upload
              allowedFileType="video"
              label="Lecture Video"
              name="lectureVideo"
              register={register}
              setValue={setValue}
              errors={errors}
              fileState={setVideoMeta}
              // viewData={view ? modalData.videoUrl : null}
              // editData={edit ? modalData.videoUrl : null}
            />
            <div>
              <label htmlFor="lectureTitle">
                Lecture Title
                <sup className="text-[0.725rem] text-pink-200">*</sup>
              </label>
              <input
                type="text"
                id="lectureTitle"
                name="lectureTitle"
                placeholder="Enter Lecture Description"
                className={`w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
                style={{
                  boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
                }}
                {...register("lectureTitle", { required: true })}
              />
              {errors.lectureDesc && (
                <span className="text-pink-200 text-sm">
                  Lecture description is required
                </span>
              )}
            </div>
            <div>
              <label htmlFor="lecture">
                Lecture Description
                <sup className="text-[0.725rem] text-pink-200">*</sup>
              </label>
              <textarea
                type="text"
                id="lectureDesc"
                name="lectureDesc"
                placeholder="Enter Lecture Description"
                rows={3}
                className={`w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
                style={{
                  boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
                }}
                {...register("lectureDesc", { required: true })}
              ></textarea>

              {errors.lectureDesc && (
                <span className="text-pink-200 text-sm">
                  Lecture title is required
                </span>
              )}
            </div>
            {!view && (
              <Button type="submit" active={true} disabled={loading}>
                {edit ? "Save Changes" : "Save"}
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LectureModal;
