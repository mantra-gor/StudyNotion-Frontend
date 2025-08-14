import { useState, useMemo } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { formatDate } from "../../../utils/dateFormatter";
import { GoCheckCircleFill, GoClockFill } from "react-icons/go";
import { TbSearch, TbSortAscending, TbSortDescending } from "react-icons/tb";
import { MdViewModule, MdViewList } from "react-icons/md";
import { FaPlay, FaBookOpen, FaUsers, FaTags } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function EnrolledCoursesTable({ enrolledData }) {
  // Enhanced state for new features
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [progressFilter, setProgressFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState("table"); // table or grid

  const courses = enrolledData || [];

  const getProgressForCourse = (course) => {
    const noOfLecturesCompleted = course.courseProgress?.completedVideos.length;
    const totalLectures =
      course?.courseContent?.reduce((total, section) => {
        return total + (section?.subSection?.length || 0);
      }, 0) || 0;

    const progressPercentage = (noOfLecturesCompleted * 100) / totalLectures;

    return progressPercentage;
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const progress = getProgressForCourse(course);
      const matchesProgress =
        progressFilter === "all" ||
        (progressFilter === "completed" && progress === 100) ||
        (progressFilter === "in-progress" && progress > 0 && progress < 100) ||
        (progressFilter === "not-started" && progress === 0);

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "free" && course.price === 0) ||
        (priceFilter === "paid" && course.price > 0);

      return matchesSearch && matchesProgress && matchesPrice;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;

        if (sortConfig.key === "progress") {
          aValue = getProgressForCourse(a);
          bValue = getProgressForCourse(b);
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (sortConfig.key === "price") {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    courses,
    enrolledData?.courseProgress,
    searchTerm,
    sortConfig,
    progressFilter,
    priceFilter,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredAndSortedCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getSortIcon = (key) => {
    if (sortConfig.key !== key)
      return <TbSortAscending className="opacity-50" />;
    return sortConfig.direction === "asc" ? (
      <TbSortAscending />
    ) : (
      <TbSortDescending />
    );
  };

  const getStatusBadge = (progress) => {
    if (progress === 100) {
      return (
        <div className="text-nowrap inline-flex items-center justify-center w-[120px] px-3 py-2 rounded-full text-sm font-medium bg-caribbeangreen-100 text-caribbeangreen-800 border border-caribbeangreen-200">
          <GoCheckCircleFill className="mr-2 h-4 w-4" />
          <span>Completed</span>
        </div>
      );
    } else if (progress > 0) {
      return (
        <div className="text-nowrap inline-flex items-center justify-center w-[120px] px-3 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          <GoClockFill className="mr-2 h-4 w-4" />
          <span>In Progress</span>
        </div>
      );
    } else {
      return (
        <div className="text-nowrap inline-flex items-center justify-center w-[120px] px-3 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
          <GoClockFill className="mr-2 h-4 w-4" />
          <span>Not Started</span>
        </div>
      );
    }
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {paginatedCourses.map((course) => {
        const progress = getProgressForCourse(course);
        return (
          <div
            key={course._id}
            className="bg-richblack-800 rounded-xl border border-richblack-700 overflow-hidden hover:border-richblack-600 transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative">
              <img
                src={course.thumbnailInfo.objectUrl}
                alt={course.title}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 right-3">
                {getStatusBadge(progress)}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-richblack-5 mb-2 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-richblack-200 mb-4 line-clamp-3">
                {course.description}
              </p>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                  <FaTags className="text-richblack-400" size={12} />
                  <div className="flex flex-wrap gap-2">
                    {course.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-richblack-200 font-medium">
                    Progress: {progress}%
                  </span>
                  <span className="text-xs text-richblack-400">
                    {course.courseContent?.length || 0} sections
                  </span>
                </div>
                <ProgressBar
                  completed={progress}
                  height="8px"
                  isLabelVisible={false}
                  bgColor={progress === 100 ? "#06D6A0" : "#118AB2"}
                  baseBgColor="#2C333F"
                  borderRadius="4px"
                  animateOnRender={true}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-richblack-700">
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/view-course/${course._id}`}
                    className="inline-flex items-center px-3 py-2 hover:brightness-105 active:brightness-110 transition-all duration-200
                    bg-yellow-50 text-black rounded-lg text-sm font-semibold"
                  >
                    <FaPlay size={12} className="mr-1" />
                    Continue
                  </Link>
                  <Link
                    to={`/course/${course._id}`}
                    className="inline-flex items-center px-3 py-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-200 rounded-lg transition-colors duration-300 border border-richblack-600 text-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-richblack-900 rounded-xl shadow-lg border border-richblack-700 overflow-hidden">
      {/* Enhanced Header with Controls */}
      <div className="bg-richblack-800 px-6 py-5 border-b border-richblack-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-richblack-5 mb-1">
              Learning Dashboard
            </h2>
            <p className="text-sm text-richblack-300">
              Track your learning progress and continue your journey •{" "}
              {filteredAndSortedCourses.length} courses
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-richblack-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "table"
                    ? "bg-richblack-600 text-richblack-5"
                    : "text-richblack-300 hover:text-richblack-5"
                }`}
              >
                <MdViewList size={20} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-richblack-600 text-richblack-5"
                    : "text-richblack-300 hover:text-richblack-5"
                }`}
              >
                <MdViewModule size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mt-6">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-md">
            <TbSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search enrolled courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3">
            <select
              value={progressFilter}
              onChange={(e) => setProgressFilter(e.target.value)}
              className="px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Progress</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Courses</option>
              <option value="free">Free Courses</option>
              <option value="paid">Paid Courses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        renderGridView()
      ) : (
        <div className="overflow-x-auto">
          <Table className="w-full">
            <Thead>
              <Tr className="bg-richblack-800 border-b border-richblack-700">
                <Th className="text-left py-4 px-6 text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("title")}
                    className="flex items-center space-x-2 hover:text-richblack-200 transition-colors"
                  >
                    <span>Course Details</span>
                    {getSortIcon("title")}
                  </button>
                </Th>
                <Th className="text-left py-4 px-6 text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("progress")}
                    className="flex items-center space-x-2 hover:text-richblack-200 transition-colors"
                  >
                    <span>Progress</span>
                    {getSortIcon("progress")}
                  </button>
                </Th>
                <Th className="text-left py-4 px-6 text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                  Status
                </Th>
                <Th className="text-left py-4 px-6 text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedCourses.length === 0 ? (
                <Tr>
                  <Td colSpan="4" className="text-center py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-richblack-800 rounded-full flex items-center justify-center mb-6">
                        <FaBookOpen className="w-10 h-10 text-richblack-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-richblack-5 mb-2">
                        {searchTerm ||
                        progressFilter !== "all" ||
                        priceFilter !== "all"
                          ? "No courses match your filters"
                          : "No enrolled courses found"}
                      </h3>
                      <p className="text-richblack-300 mb-4">
                        {searchTerm ||
                        progressFilter !== "all" ||
                        priceFilter !== "all"
                          ? "Try adjusting your search or filters"
                          : "Start learning by enrolling in courses"}
                      </p>
                      {(searchTerm ||
                        progressFilter !== "all" ||
                        priceFilter !== "all") && (
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setProgressFilter("all");
                            setPriceFilter("all");
                          }}
                          className="px-4 py-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 rounded-lg transition-colors"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </Td>
                </Tr>
              ) : (
                paginatedCourses.map((course) => {
                  const progress = getProgressForCourse(course);
                  return (
                    <Tr
                      key={course._id}
                      className="hover:bg-richblack-800 transition-colors duration-200 border-b border-richblack-700"
                    >
                      <Td className="py-6 px-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 group">
                            <img
                              src={course.thumbnailInfo.objectUrl}
                              alt={course.title}
                              className="h-16 w-24 rounded-lg object-cover shadow-md border border-richblack-600 group-hover:shadow-lg transition-shadow duration-200"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold text-richblack-5 mb-2 line-clamp-2 hover:text-richblack-200 transition-colors">
                              {course.title}
                            </h4>
                            <p className="text-sm text-richblack-300 mb-3 line-clamp-2">
                              {course.description}
                            </p>

                            {/* Tags */}
                            {course.tags && course.tags.length > 0 && (
                              <div className="flex items-center space-x-2 mb-2">
                                <FaTags
                                  className="text-richblack-400"
                                  size={12}
                                />
                                <div className="flex space-x-2">
                                  {course.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center text-xs text-richblack-400">
                              <FaUsers className="w-3 h-3 mr-2" />
                              <span>
                                {course.courseContent?.length || 0} sections
                              </span>
                            </div>
                          </div>
                        </div>
                      </Td>

                      <Td className="py-6 px-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-richblack-200">
                              {progress}%
                            </span>
                            <span className="text-xs text-richblack-400 text-nowrap">
                              {progress === 100
                                ? "Complete"
                                : progress > 0
                                ? "In Progress"
                                : "Not Started"}
                            </span>
                          </div>
                          <ProgressBar
                            completed={progress}
                            height="8px"
                            isLabelVisible={false}
                            bgColor={progress === 100 ? "#06D6A0" : "#118AB2"}
                            baseBgColor="#2C333F"
                            borderRadius="4px"
                            animateOnRender={true}
                          />
                        </div>
                      </Td>

                      <Td className="py-6 px-6">{getStatusBadge(progress)}</Td>

                      <Td className="py-6 px-6">
                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/view-course/${course._id}/section/${course.courseContent[0]._id}/subSection/${course.courseContent[0].subSection[0]}`}
                            className="inline-flex items-center px-3 py-2 
                            hover:brightness-105 active:brightness-110 transition-all duration-200 bg-yellow-50 text-black rounded-lg 
                            text-sm font-semibold"
                          >
                            <FaPlay size={12} className="mr-1" />
                            Continue
                          </Link>
                          <Link
                            to={`/course/${course._id}`}
                            className="inline-flex items-center px-3 py-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-200 rounded-lg transition-colors duration-300 border border-richblack-600 text-sm"
                          >
                            Details
                          </Link>
                        </div>
                      </Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {filteredAndSortedCourses.length > 0 && (
        <div className="bg-richblack-800 px-6 py-4 border-t border-richblack-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-richblack-300">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-richblack-700 border border-richblack-600 rounded text-richblack-5 focus:outline-none focus:ring-2 focus:ring-richblack-700 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span className="text-sm text-richblack-300">
                of {filteredAndSortedCourses.length} courses
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-richblack-700 hover:bg-richblack-600 disabled:opacity-50 disabled:cursor-not-allowed text-richblack-5 rounded-md transition-colors text-sm"
              >
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {[...Array(Math.min(5, totalPages))].map((_, index) => {
                  const pageNumber =
                    Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                    index;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                        currentPage === pageNumber
                          ? "bg-richblack-600 text-white"
                          : "bg-richblack-700 hover:bg-richblack-600 text-richblack-5"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-richblack-700 hover:bg-richblack-600 disabled:opacity-50 disabled:cursor-not-allowed text-richblack-5 rounded-md transition-colors text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnrolledCoursesTable;
