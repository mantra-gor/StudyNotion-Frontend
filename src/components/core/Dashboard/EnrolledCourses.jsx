import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../../ui/spinner/Spinner";
import { getUserEnrolledCourses } from "../../../services/operations/dashboardApi";
import ProgressBar from "@ramonak/react-progress-bar";

function EnrolledCourses() {
  const dispatch = useDispatch();
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const request = async () => {
    dispatch(await getUserEnrolledCourses(setEnrolledCourses));
  };
  useEffect(() => {
    request();
  }, []);

  return (
    <div className=" text-richblack-5">
      <div>Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : !enrolledCourses.length ? (
        <p>You have not enrolled in any course yet!</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Durations</p>
            <p>Progress</p>
          </div>
          {/* Cards */}
          {enrolledCourses.map((course) => {
            <div key={course._id}>
              <div>
                <img src={course.thumbnail} alt="thumbnail" />
                <div>
                  <p>{course.title}</p>
                  <p>{course.description}</p>
                </div>
              </div>
              <div>{course?.totalDuration}</div>
              <div>
                <p>Progress: {course.progressPercentage || 0}</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>;
          })}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
