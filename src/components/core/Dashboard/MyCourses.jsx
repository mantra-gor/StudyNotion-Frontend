import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { RxPlus } from "react-icons/rx";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsApi";

function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses();
      if (result.success) {
        setCourses(result.data);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="text-richblack-5">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <Button
          onClick={() => navigate("/dashboard/add-course")}
          className="!w-36 flex justify-between items-center"
          active
        >
          Add Course
          <RxPlus size={19} />
        </Button>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
}

export default MyCourses;
