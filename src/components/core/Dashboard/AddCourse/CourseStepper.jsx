import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import CourseInformationForm from "./CourseInformationForm/CourseInformationForm";

function CourseStepper() {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        {steps.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-evenly items-center gap-3"
          >
            <div
              className={`${
                step === item.id
                  ? " bg-yellow-900 border-yellow-50 text-yellow-50"
                  : " border-richblack-100 bg-richblack-800 text-richblack-300 "
              } w-10 h-10 rounded-full flex justify-center items-center border text-lg font-semibold`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>
            {/* Add Dashes ---------------------- */}
            {/* {item.id !== steps.length} */}
            <div className="text-sm">{item.title}</div>
          </div>
        ))}
      </div>
      <CourseInformationForm />
    </div>
  );
}

export default CourseStepper;
