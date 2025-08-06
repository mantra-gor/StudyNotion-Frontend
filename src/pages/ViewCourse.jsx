import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { fetchCourseWithContent } from "../services/operations/courseDetailsApi";
import {
  setEntireCourseData,
  setCourseSectionData,
  setCompletedLectures,
  setTotalNoOfLectures,
  setCurrentVideoKey,
} from "../redux/slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificData = async () => {
      const courseData = await fetchCourseWithContent(courseID);

      dispatch(setCourseSectionData(courseData.data.courseContent));
      dispatch(setEntireCourseData(courseData.data));
      dispatch(
        setCurrentVideoKey(
          courseData?.data?.courseContent[0]?.subSection[0]?.videoInfo.key
        )
      );
      // dispatch(setCompletedLectures());

      const lectures =
        courseData?.data?.courseContent?.reduce((total, section) => {
          return total + (section?.subSection?.length || 0);
        }, 0) || 0;

      dispatch(setTotalNoOfLectures(lectures));
    };

    setCourseSpecificData();
  }, []);

  return (
    <>
      <div className="text-richblack-5 flex w-full h-[calc(100vh-56px)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="w-11/12 mx-auto">
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}

export default ViewCourse;
