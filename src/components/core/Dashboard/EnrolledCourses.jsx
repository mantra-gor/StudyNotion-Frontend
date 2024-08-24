import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/dashboardApi";

function EnrolledCourses() {
  const dispatch = useDispatch();
  const [enrolledCourses, setEnrolledCourses] = useState();

  // setInterval(() => {
  dispatch(getUserEnrolledCourses(setEnrolledCourses));
  // }, 4000);

  return <div>EnrolledCourses</div>;
}

export default EnrolledCourses;
