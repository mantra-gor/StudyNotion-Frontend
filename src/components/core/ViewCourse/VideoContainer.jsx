import { useEffect, useState } from "react";
import {
  fetchLecturePresignedURL,
  updateCourseProgress,
} from "../../../services/operations/courseDetailsApi";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import Button from "../../ui/Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice";

function VideoContainer() {
  const { currentVideoKey, courseEntireData, courseSectionData } = useSelector(
    (state) => state.viewCourse
  );
  const dispatch = useDispatch();
  const { courseID, sectionID, subSectionID } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentVideoKey) {
      return;
    }

    const setPersignedUrl = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchLecturePresignedURL(
          currentVideoKey,
          courseEntireData._id
        );
        setVideoUrl(res.data);
        setVideoLoaded(false);
      } catch (err) {
        console.error("Error fetching video URL:", err);
        setError("Failed to load video. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    setPersignedUrl();
  }, [currentVideoKey, courseEntireData._id]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const getIndexesOfSectionAndSubSection = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionID
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionID);

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection.length;

    return { currentSectionIndex, currentSubSectionIndex, noOfSubSections };
  };

  const isLastVideo = () => {
    const { currentSectionIndex, currentSubSectionIndex, noOfSubSections } =
      getIndexesOfSectionAndSubSection();

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    if (isLastVideo())
      return toast.success("Congratulations! You have completed the course.");

    const { currentSectionIndex, currentSubSectionIndex, noOfSubSections } =
      getIndexesOfSectionAndSubSection();

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      // it means next video is in same section
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseID}/section/${sectionID}/subSection/${nextSubSectionId}`
      );
    } else {
      // else next video will be the first video of the next section
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseID}/section/${nextSectionId}/subSection/${nextSubSectionId}`
      );
    }
  };

  const handleLectureComplete = async () => {
    // call api to mark the lecture completed
    const response = await updateCourseProgress({ courseID, subSectionID });

    if (response.success) {
      dispatch(updateCompletedLectures(subSectionID));
      goToNextVideo();
    }
  };

  return (
    <div className="h-full bg-richblack-900 text-richblack-5">
      <div className="flex flex-col h-full">
        {/* Course Header */}
        <div className="border-b border-dashed border-richblack-700 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white line-clamp-1">
              {courseEntireData?.title || "Course Title"}
            </h1>

            <div>
              <Button
                onClick={handleLectureComplete}
                className="!bg-caribbeangreen-500 flex items-center justify-between"
              >
                Mark as completed
                <MdKeyboardArrowRight size={22} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Video Container */}
        <div className="flex-1 relative bg-black">
          {loading ? (
            /* Loading State */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-richblack-900">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-richblack-200 text-lg font-medium">
                Loading video...
              </p>
              <p className="text-richblack-400 text-sm mt-2">
                Please wait while we prepare your content
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-richblack-900">
              <div className="w-20 h-20 bg-richblack-800 rounded-full flex items-center justify-center mb-6 border border-richblack-700">
                <svg
                  className="w-10 h-10 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Video Unavailable
              </h3>
              <p className="text-richblack-300 text-center max-w-md mb-6">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-caribbeangreen-400 hover:bg-caribbeangreen-300 text-richblack-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          ) : videoUrl ? (
            /* Video Player */
            <div className="relative w-full h-full group">
              {!videoLoaded && (
                <div className="absolute inset-0 bg-richblack-900 flex items-center justify-center z-10">
                  <div className="text-center">
                    <BiLoader className="w-8 h-8 text-yellow-200 animate-spin mx-auto mb-2" />
                    <p className="text-richblack-300">Preparing video...</p>
                  </div>
                </div>
              )}

              <video
                key={videoUrl}
                controls
                controlsList="nodownload"
                onLoadedData={handleVideoLoad}
                onError={() => setError("Video failed to load")}
                className="w-full h-full max-h-[calc(100vh-140px)] object-contain bg-black"
                poster={courseEntireData.thumbnailInfo.objectUrl}
              >
                <source src={videoUrl} type="video/mp4" />
                <track kind="captions" src="" label="English" default />
                Your browser does not support the video tag.
              </video>

              {/* Custom Video Overlay (Optional) */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute top-4 right-4 bg-black/50 rounded-lg px-3 py-1 text-white text-sm">
                  HD Quality
                </div>
              </div>
            </div>
          ) : (
            /* No Video State */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-richblack-900">
              <div className="w-20 h-20 bg-richblack-800 rounded-full flex items-center justify-center mb-6 border border-richblack-700">
                <FaPlay className="w-8 h-8 text-richblack-400 ml-1" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Video Selected
              </h3>
              <p className="text-richblack-300 text-center max-w-md">
                Select a lecture from the sidebar to start watching
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoContainer;
