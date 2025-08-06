import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { MdArrowDropDown, MdArrowDropUp, MdCheck } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCurrentVideoKey } from "../../../redux/slices/viewCourseSlice";

function VideoDetailsSidebar() {
  const { courseSectionData, totalNoOfLectures, completedLectures } =
    useSelector((state) => state.viewCourse);
  const { sectionID, subSectionID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [expandedSection, setExpandedSection] = useState({});

  // Auto-expand the current section
  useState(() => {
    if (sectionID) {
      setExpandedSection((prev) => ({
        ...prev,
        [sectionID]: true,
      }));
    }
  }, [sectionID]);

  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const isVideoCompleted = (videoId) => {
    // Add your logic to check if video is completed
    // This would typically come from your Redux state or API
    return false; // Placeholder
  };

  const isCurrentVideo = (videoId) => {
    return subSectionID === videoId;
  };

  const handleVideoChange = (subSection) => {
    dispatch(setCurrentVideoKey(subSection.videoInfo.key));
    const path = location.pathname.split("/");
    // Replace last segment (subSection ID)
    path[path.length - 1] = subSection._id;
    const newPath = path.join("/");
    navigate(newPath);
  };

  return (
    <div className="bg-richblack-900 h-full border-r border-richblack-700">
      <div className="flex h-full flex-col w-[380px]">
        {/* Header */}
        <div className="p-6 border-b border-richblack-700">
          <div className="flex items-center justify-between mb-4.">
            <h2 className="text-xl font-bold text-white">Course Content</h2>
            <Button className="!w-fit !px-3 !py-1" active>
              Review
            </Button>
          </div>
        </div>

        {/* Course Sections */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-3">
            {courseSectionData?.map((section, sectionIndex) => {
              const sectionProgress = section.subSection
                ? (section.subSection.filter((sub) => isVideoCompleted(sub._id))
                    .length /
                    section.subSection.length) *
                  100
                : 0;

              return (
                <div
                  key={section._id}
                  className="bg-richblack-800 rounded-lg border border-richblack-700 overflow-hidden"
                >
                  {/* Section Header */}
                  <div
                    onClick={() => toggleSection(section._id)}
                    className="p-3 cursor-pointer hover:bg-richblack-700 transition-colors duration-200 border-b border-richblack-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-richblack-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {sectionIndex + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold line-clamp-1">
                            {section.sectionName}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-richblack-400">
                            <span>
                              {section.subSection?.length || 0} lecture
                              {section.subSection?.length == 1 ? "" : "s"}
                            </span>
                            {/* <span>
                              ~{(section.subSection?.length || 0) * 20} min
                            </span> */}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {expandedSection[section._id] ? (
                          <MdArrowDropUp className="text-richblack-400 text-3xl" />
                        ) : (
                          <MdArrowDropDown className="text-richblack-400 text-3xl" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  {expandedSection[section._id] && (
                    <div className="divide-y divide-richblack-700">
                      {section.subSection?.map((subSection, lectureIndex) => {
                        const isCompleted = isVideoCompleted(subSection._id);
                        const isCurrent = isCurrentVideo(subSection._id);

                        return (
                          <div
                            key={subSection._id}
                            className={`p-4 cursor-pointer transition-all duration-200. hover:bg-richblack-700/50 ${
                              isCurrent
                                ? "bg-blue-600/20 border-l-4 border-blue-400"
                                : ""
                            }`}
                            onClick={() => {
                              handleVideoChange(subSection);
                            }}
                          >
                            <div className="flex items-start space-x-4">
                              {/* Video Status Icon */}
                              <div className="flex-shrink-0 mt-1">
                                {isCompleted ? (
                                  <div className="w-8 h-8 bg-caribbeangreen-400 rounded-full flex items-center justify-center">
                                    <MdCheck className="text-richblack-900 text-lg" />
                                  </div>
                                ) : isCurrent ? (
                                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <FaPlay className="text-white text-sm ml-0.5" />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 bg-richblack-600 rounded-full flex items-center justify-center hover:bg-richblack-500 transition-colors">
                                    <FaPlay className="text-richblack-300 text-sm ml-0.5" />
                                  </div>
                                )}
                              </div>

                              {/* Video Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 mr-3">
                                    <h4
                                      className={`font-semibold text-base line-clamp-2 ${
                                        isCurrent
                                          ? "text-blue-200"
                                          : "text-white"
                                      }`}
                                    >
                                      {subSection.title}
                                    </h4>
                                    {subSection.description && (
                                      <p className="text-richblack-300 text-sm mt-1 line-clamp-2 leading-relaxed">
                                        {subSection.description}
                                      </p>
                                    )}
                                  </div>

                                  {/* Duration Badge */}
                                  <div
                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                      isCurrent
                                        ? "bg-blue-500/20 text-blue-300"
                                        : "bg-richblack-600 text-richblack-300"
                                    }`}
                                  >
                                    4 min
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Progress */}
        <div className="p-2 border-t border-richblack-700">
          <div className="bg-richblack-800 rounded-lg p-3 border border-richblack-700">
            <h4 className="text-white font-semibold mb-1">Course Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-richblack-300">Completed</span>
                <span className="text-richblack-200">
                  {completedLectures.length} of {totalNoOfLectures}
                </span>
              </div>
              <div className="w-full bg-richblack-600 rounded-full h-2">
                <div
                  className="bg-caribbeangreen-400 h-2 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailsSidebar;
