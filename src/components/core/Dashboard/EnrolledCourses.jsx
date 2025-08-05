import { useEffect, useState } from "react";
import Spinner from "../../ui/spinner/Spinner";
import { fetchEnrolledCourses } from "../../../services/operations/courseDetailsApi";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import EnrolledCoursesTable from "./EnrolledCoursesTable";

function EnrolledCourses() {
  const [enrolledData, setEnrolledData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      try {
        setLoading(true);
        const res = await fetchEnrolledCourses();
        setEnrolledData(res.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        setEnrolledData({ courses: [], courseProgress: [] });
      } finally {
        setLoading(false);
      }
    };
    request();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex flex-col justify-center items-center">
        <Spinner />
        <p className="text-richblack-200 text-lg mt-4">
          Loading your enrolled courses...
        </p>
      </div>
    );
  }

  const courses = enrolledData?.courses || [];

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 p-6">
      <h1 className="text-2xl font-bold mb-6">Enrolled Courses</h1>
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-richblack-800 rounded-full flex items-center justify-center mb-8 border-4 border-richblack-700">
            <FaGraduationCap size={46} className="text-richblack-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            No Enrolled Courses
          </h2>
          <p className="text-richblack-300 mb-8 text-center max-w-md">
            You haven't enrolled in any courses yet. Start your learning journey
            by exploring our course catalog.
          </p>
          <Link
            to="/catalog"
            className="bg-gradient-to-r from-blue-600 to-caribbeangreen-600 hover:from-blue-500 hover:to-caribbeangreen-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg text-lg"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        <EnrolledCoursesTable enrolledData={enrolledData} />
      )}
    </div>
  );
}

export default EnrolledCourses;
