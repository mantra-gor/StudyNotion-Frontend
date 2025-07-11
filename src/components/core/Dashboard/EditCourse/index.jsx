import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CourseStepper from "../AddCourse/CourseStepper";
import { uploadTips } from "../../../../utils/constants";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { setCourse, setEditCourse } from "../../../../redux/slices/courseSlice";

function EditCourse() {
  const dispatch = useDispatch();
  const { courseID } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse();
      if (result.success) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result.data)); // check the result first
      }
    };
  }, []);

  return (
    <div className="text-richblack-5 flex justify-between">
      <div className="w-6/12">
        <h1 className="text-2xl font-semibold">Edit Course</h1>
        <div className="mt-6">
          <div>{course ? <CourseStepper /> : <div>Course Not Found</div>}</div>
        </div>
      </div>
      <div className="w-5/12 h-fit bg-richblack-800 border border-richblack-700 p-8 rounded-lg">
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

export default EditCourse;
