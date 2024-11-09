import CourseStepper from "./CourseStepper";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

function AddCourse() {
  const uploadTips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important.",
    "Notes to all enrolled students at once.",
  ];
  return (
    <div className="text-richblack-5 flex justify-between">
      <div className="w-6/12">
        <h1 className="text-2xl font-semibold">Add Course</h1>
        <div className="mt-6">
          <CourseStepper />
        </div>
      </div>
      <div className="w-5/12 h-fit bg-richblack-800 border border-richblack-700 p-8 rounded-lg">
        <h3 className="text-xl font-semibold flex items-center gap-2 p-1">
          <MdOutlineTipsAndUpdates className="text-yellow-200" size={26} />
          Code Upload Tips
        </h3>
        <ul className="p-2">
          {uploadTips?.map((tip, index) => (
            <li className="m-2" key={index}>
              • {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddCourse;
