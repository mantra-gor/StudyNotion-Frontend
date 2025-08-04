import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Footer from "../components/common/Footer";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { catalogData } from "../services/apiEndpoints";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import {
  FaHome,
  FaChevronRight,
  FaFire,
  FaStar,
  FaClock,
  FaUsers,
  FaSearch,
} from "react-icons/fa";
import Spinner from "../components/ui/spinner/Spinner";

const { CATALOG_PAGE_API } = catalogData;

function Catalog() {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const [activeTab, setActiveTab] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const res = await apiConnector("GET", CATALOG_PAGE_API);

        const category_id = res.data.filter(
          (category) =>
            category.name.toLowerCase().split(" ").join("-") ===
            catalogName.toLowerCase()
        )[0]?._id;
        setCategoryId(category_id);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryData = async () => {
      if (!categoryId) return;

      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategoryData();
  }, [categoryId]);

  const getCoursesByTab = () => {
    if (!catalogPageData?.selectedCategory?.course) return [];

    const courses = catalogPageData.selectedCategory.course;
    switch (activeTab) {
      case "popular":
        return [...courses].sort(
          (a, b) =>
            (b.ratingsAndReviews?.length || 0) -
            (a.ratingsAndReviews?.length || 0)
        );
      case "new":
        return [...courses].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "trending":
        return [...courses].sort(
          (a, b) =>
            (b.studentsEnrolled?.length || 0) -
            (a.studentsEnrolled?.length || 0)
        );
      default:
        return courses;
    }
  };

  const filteredCourses = getCoursesByTab().filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section with Breadcrumb */}
      <div className="relative bg-gradient-to-br from-richblack-800 via-richblack-800 to-richblack-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, ${
                catalogPageData?.selectedCategory ? "#06D6A0" : "#118AB2"
              } 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 mb-8 text-sm">
            <Link
              to="/"
              className="flex items-center text-richblack-300 hover:text-yellow-200 transition-colors duration-200"
            >
              <FaHome className="mr-1" />
              Home
            </Link>
            <FaChevronRight className="text-richblack-500" size={12} />
            <Link
              to="/catalog"
              className="text-richblack-300 hover:text-yellow-200 transition-colors duration-200"
            >
              Catalog
            </Link>
            <FaChevronRight className="text-richblack-500" size={12} />
            <span className="text-yellow-100 font-medium cursor-pointer">
              {catalogPageData?.selectedCategory?.name || catalogName}
            </span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-50 to-caribbeangreen-100 bg-clip-text text-transparent leading-tight">
                  {catalogPageData?.selectedCategory?.name || "Explore Courses"}
                </h1>
                <p className="text-richblack-200 text-lg lg:text-xl max-w-2xl leading-relaxed">
                  {catalogPageData?.selectedCategory?.description ||
                    "Discover world-class courses designed to help you master new skills and advance your career."}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2 bg-richblack-700/50 px-4 py-2 rounded-full backdrop-blur-sm border border-richblack-600">
                  <FaUsers className="text-caribbeangreen-200" />
                  <span className="text-richblack-200 text-sm">
                    {catalogPageData?.selectedCategory?.course?.length || 0}{" "}
                    Courses
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-richblack-700/50 px-4 py-2 rounded-full backdrop-blur-sm border border-richblack-600">
                  <FaStar className="text-yellow-200" />
                  <span className="text-richblack-200 text-sm">
                    Expert Instructors
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-richblack-700/50 px-4 py-2 rounded-full backdrop-blur-sm border border-richblack-600">
                  <FaClock className="text-blue-200" />
                  <span className="text-richblack-200 text-sm">
                    Self-Paced Learning
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-500/20 to-caribbeangreen-400/20 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-richblack-700 to-richblack-800 rounded-2xl border border-richblack-600 flex items-center justify-center shadow-2xl">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-caribbeangreen-400 rounded-full flex items-center justify-center mx-auto">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          Premium Learning
                        </h3>
                        <p className="text-richblack-300 text-sm">
                          Start your journey today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Featured Courses Section */}
        <section className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">
                Courses to get you started
              </h2>
              <p className="text-richblack-300">
                Choose from our most popular and highly-rated courses
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-richblack-800 border border-richblack-700 rounded-lg text-richblack-100 placeholder-richblack-400 focus:outline-none focus:border-blue-400 transition-colors duration-200 w-64"
                />
              </div>
              {/* <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-richblack-800 border border-richblack-700 rounded-lg text-richblack-200 hover:bg-richblack-700 transition-colors duration-200"
              >
                <FaFilter size={14} />
                <span>Filters</span>
              </button> */}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 bg-richblack-800 p-1 rounded-lg w-fit">
            {[
              { id: "popular", label: "Most Popular", icon: FaFire },
              { id: "new", label: "New", icon: FaStar },
              { id: "trending", label: "Trending", icon: FaUsers },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === id
                    ? "bg-gradient-to-r from-blue-600 to-caribbeangreen-600 text-white shadow-lg"
                    : "text-richblack-300 hover:text-white hover:bg-richblack-700"
                }`}
              >
                <Icon size={14} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Course Slider */}
          <CourseSlider
            courses={filteredCourses}
            title={`${
              activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
            } Courses`}
            autoplay={true}
          />
        </section>

        {/* Other Courses Section */}
        <section className="space-y-8">
          <CourseSlider
            courses={catalogPageData?.otherCourses || []}
            title="You might also like"
            subtitle="Courses from related categories that match your interests"
            autoplay={true}
          />
        </section>

        {/* Coming Soon Section */}
        <section className="bg-gradient-to-br from-richblack-800/50 to-richblack-700/30 rounded-2xl p-8 border border-richblack-700 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-brown-400 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-richblack-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Frequently Bought Together
            </h3>
            <p className="text-richblack-300 max-w-2xl mx-auto">
              We're working on bringing you curated course bundles and
              recommendations. Stay tuned for exciting package deals and combo
              offers!
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-brown-400 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Notify Me When Available
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Catalog;
