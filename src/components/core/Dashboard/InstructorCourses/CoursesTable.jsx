import { useState, useMemo } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { formattedDate } from "../../../../utils/dateFormatter";
import { COURSES_STATUSES } from "../../../../utils/constants";
import { GoCheckCircleFill, GoClockFill } from "react-icons/go";
import {
  TbEdit,
  TbSearch,
  TbSortAscending,
  TbSortDescending,
} from "react-icons/tb";
import {
  MdOutlineDelete,
  MdFilterList,
  MdViewModule,
  MdViewList,
} from "react-icons/md";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsApi";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";

function CoursesTable({ courses, setCourses }) {
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();

  // Enhanced state for new features
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [statusFilter, setStatusFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState("table"); // table or grid

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse(courseId);

    // Refresh the courses list after deletion
    const result = await fetchInstructorCourses();
    if (result.success) {
      setCourses(result.data);
    }

    // Close the confirmation modal
    setLoading(false);
    closeConfirmationModal();
  };

  const handleEditCourse = (courseID) => {
    // handle logic here
    navigate(`/dashboard/edit-course/${courseID}`);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setConfirmationModal(null);
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
    let filtered =
      courses?.filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || course.status === statusFilter;

        const matchesPrice =
          priceFilter === "all" ||
          (priceFilter === "free" && course.price === 0) ||
          (priceFilter === "paid" && course.price > 0);

        return matchesSearch && matchesStatus && matchesPrice;
      }) || [];

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

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
  }, [courses, searchTerm, sortConfig, statusFilter, priceFilter]);

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

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {paginatedCourses.map((course) => (
        <div
          key={course._id}
          className="bg-richblack-800 rounded-xl border border-richblack-700 overflow-hidden hover:border-richblack-600 transition-all duration-300 hover:shadow-lg"
        >
          <div className="relative">
            <img
              src={course.thumbnailInfo.objectUrl}
              alt={course.title}
              className="h-48 w-full object-cover"
            />
            <div className="absolute top-3 right-3">
              {course.status === COURSES_STATUSES.DRAFT ? (
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-200 text-yellow-800 border border-pink-300">
                  <GoClockFill className="mr-1 h-3 w-3" />
                  Draft
                </div>
              ) : (
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                  <GoCheckCircleFill className="mr-1 h-3 w-3" />
                  Published
                </div>
              )}
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-lg font-semibold text-richblack-5 mb-2 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-richblack-200 mb-4 line-clamp-3">
              {course.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-richblack-300">
                Created: {formattedDate()}
              </div>
              <div className="text-right">
                {course.price === 0 ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-caribbeangreen-200 text-caribbeangreen-800 border border-caribbeangreen-300">
                    Free
                  </span>
                ) : (
                  <span className="text-lg font-semibold text-richblack-5">
                    ₹{course.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-richblack-700">
              <div className="flex items-center space-x-2">
                <button
                  disabled={loading}
                  className="inline-flex items-center p-2 hover:bg-richblack-600 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleEditCourse(course._id)}
                  title="Edit course"
                >
                  <TbEdit size={18} />
                </button>
                <button
                  disabled={loading}
                  className="inline-flex items-center p-2 hover:bg-pink-600 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setConfirmationModal({
                      modalTitle: "Delete Course",
                      modalText:
                        "Are you sure you want to delete this course? All related data will be permanently removed and cannot be recovered.",
                      highlightedBtnText: "Delete Course",
                      highlightedBtnOnClick: () =>
                        handleCourseDelete(course._id),
                      btnText: "Cancel",
                      btnOnclick: closeConfirmationModal,
                    });
                    setShowConfirmationModal(true);
                  }}
                  title="Delete course"
                >
                  <MdOutlineDelete size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-richblack-900 rounded-xl shadow-lg border border-richblack-700 overflow-hidden">
      {/* Enhanced Header with Controls */}
      <div className="bg-richblack-800 px-6 py-5 border-b border-richblack-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-richblack-5 mb-1">
              Course Management
            </h2>
            <p className="text-sm text-richblack-300">
              Organize, edit, and monitor your course catalog •{" "}
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
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value={COURSES_STATUSES.DRAFT}>Draft</option>
              <option value={COURSES_STATUSES.PUBLISHED}>Published</option>
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
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
                    onClick={() => handleSort("status")}
                    className="flex items-center space-x-2 hover:text-richblack-200 transition-colors"
                  >
                    <span>Status</span>
                    {getSortIcon("status")}
                  </button>
                </Th>
                <Th className="text-left py-4 px-6 text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("price")}
                    className="flex items-center space-x-2 hover:text-richblack-200 transition-colors"
                  >
                    <span>Price</span>
                    {getSortIcon("price")}
                  </button>
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
                        <svg
                          className="w-10 h-10 text-richblack-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-richblack-5 mb-2">
                        {searchTerm ||
                        statusFilter !== "all" ||
                        priceFilter !== "all"
                          ? "No courses match your filters"
                          : "No courses found"}
                      </h3>
                      <p className="text-richblack-300 mb-4">
                        {searchTerm ||
                        statusFilter !== "all" ||
                        priceFilter !== "all"
                          ? "Try adjusting your search or filters"
                          : "Start by creating your first course"}
                      </p>
                      {(searchTerm ||
                        statusFilter !== "all" ||
                        priceFilter !== "all") && (
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
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
                paginatedCourses.map((course) => (
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
                          <div className="flex items-center text-xs text-richblack-400">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Created: {formattedDate()}
                          </div>
                        </div>
                      </div>
                    </Td>
                    <Td className="py-6 px-6">
                      {course.status === COURSES_STATUSES.DRAFT ? (
                        <div className="inline-flex items-center justify-center w-[120px] px-3 py-2 rounded-full text-sm font-medium bg-pink-200 text-yellow-800 border border-pink-300">
                          <GoClockFill className="mr-2 h-4 w-4" />
                          <span>Draft</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-[120px] px-3 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          <GoCheckCircleFill className="mr-2 h-4 w-4" />
                          <span>Published</span>
                        </div>
                      )}
                    </Td>
                    <Td className="py-6 px-6">
                      {course.price === 0 ? (
                        <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-caribbeangreen-200 text-caribbeangreen-800 border border-caribbeangreen-300">
                          Free
                        </span>
                      ) : (
                        <span className="text-xl font-bold text-richblack-5">
                          ₹{course.price.toLocaleString()}
                        </span>
                      )}
                    </Td>
                    <Td className="py-6 px-6">
                      <div className="flex items-center space-x-3">
                        <button
                          disabled={loading}
                          className="inline-flex items-center p-2.5 hover:bg-richblack-600 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                          onClick={() => handleEditCourse(course._id)}
                          title="Edit course"
                        >
                          <TbEdit
                            size={20}
                            className="text-richblack-400 group-hover:text-richblack-200"
                          />
                        </button>
                        <button
                          disabled={loading}
                          className="inline-flex items-center p-2.5 hover:bg-pink-600 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                          onClick={() => {
                            setConfirmationModal({
                              modalTitle: "Delete Course",
                              modalText:
                                "Are you sure you want to delete this course? All related data will be permanently removed and cannot be recovered.",
                              highlightedBtnText: "Delete Course",
                              highlightedBtnOnClick: () =>
                                handleCourseDelete(course._id),
                              btnText: "Cancel",
                              btnOnclick: closeConfirmationModal,
                            });
                            setShowConfirmationModal(true);
                          }}
                          title="Delete course"
                        >
                          <MdOutlineDelete
                            size={20}
                            className="text-richblack-400 group-hover:text-richblack-200"
                          />
                        </button>
                      </div>
                    </Td>
                  </Tr>
                ))
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

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-richblack-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-lg font-medium text-richblack-5">
              Processing...
            </span>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          modalTitle={confirmationModal.modalTitle}
          modalText={confirmationModal.modalText}
          highlightedBtnText={confirmationModal.highlightedBtnText}
          highlightedBtnOnClick={confirmationModal.highlightedBtnOnClick}
          btnText={confirmationModal.btnText}
          btnOnclick={confirmationModal.btnOnclick}
          processing={loading}
        />
      )}
    </div>
  );
}

export default CoursesTable;
