import { useDispatch } from "react-redux";
import { uploadTips } from "../../../../utils/constants";
import CourseStepper from "./CourseStepper";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { setEditCourse } from "../../../../redux/slices/courseSlice";

function AddCourse() {
  const dispatch = useDispatch();
  dispatch(setEditCourse(false));
  return (
    <div className="text-richblack-5 flex justify-between">
      <div className="w-6/12 max-w-full">
        <h1 className="text-2xl font-semibold">Add Course</h1>
        <div className="mt-6">
          <CourseStepper />
        </div>
      </div>
      <div className="w-5/12 max-w-[440px] h-fit bg-richblack-800 border border-richblack-700 p-8 rounded-lg">
        <h3 className="text-xl font-semibold flex items-center gap-2 p-1">
          <MdOutlineTipsAndUpdates className="text-yellow-200" size={26} />
          Course Upload Tips
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
