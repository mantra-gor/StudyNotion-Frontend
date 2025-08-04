import { BiCartAdd, BiPlay, BiTime, BiBookBookmark } from "react-icons/bi";
import {
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaVideo,
  FaClock,
  FaLanguage,
  FaCheck,
  FaShare,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaChevronRight,
} from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdVerified, MdAccessTime, MdOutlinePayments } from "react-icons/md";
import Button from "../components/ui/Button";
import { buyCourse } from "../services/operations/purchaseApi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsApi";
import Spinner from "../components/ui/spinner/Spinner";
import { formatDate } from "../utils/dateFormatter";
import { IoMdSchool } from "react-icons/io";
import toast from "react-hot-toast";
import Footer from "../components/common/Footer";
import useAuth from "../hooks/useAuth";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { courseID } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedin } = useAuth();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseID);
      if (result?.success) {
        setCourseData(result.data);
      }
      setLoading(false);
    };
    fetchCourseDetails();
  }, [courseID]);

  const handlePurchase = () => {
    if (!isLoggedin) {
      toast("Please login to enroll the course.");
      return navigate("/login");
    }
    buyCourse({
      courses: [courseID],
      userDetails: user,
      navigate,
      dispatch,
    });
  };

  const shareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Course link copied to clipboard!");
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Dynamic calculations based on actual course data
  const getTotalLectures = () => {
    return (
      courseData?.courseContent?.reduce(
        (total, section) => total + (section.subSection?.length || 0),
        0
      ) || 0
    );
  };

  const getTotalSections = () => {
    return courseData?.courseContent?.length || 0;
  };

  const getEstimatedDuration = () => {
    // TODO: Implement a real duration calculation based on lectures

    const lectures = getTotalLectures();
    if (lectures === 0) return "Duration not specified";

    // More realistic estimation: 15-30 minutes per lecture
    const avgMinutesPerLecture = 20;
    const totalMinutes = lectures * avgMinutesPerLecture;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    }
    return `${minutes}m`;
  };

  const getCourseLevel = () => {
    const lectures = getTotalLectures();
    if (lectures <= 5) return "Beginner";
    if (lectures <= 15) return "Intermediate";
    return "Advanced";
  };

  const getAverageRating = () => {
    if (!courseData?.ratingsAndReviews?.length) return 0;
    const total = courseData.ratingsAndReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return (total / courseData.ratingsAndReviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    if (!courseData?.ratingsAndReviews?.length) return [0, 0, 0, 0, 0];

    const distribution = [0, 0, 0, 0, 0];
    courseData.ratingsAndReviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating - 1]++;
      }
    });
    return distribution.reverse(); // Show 5 stars first
  };

  const renderStars = (rating, size = "text-base") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={`text-yellow-400 ${size}`} />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className={`text-yellow-400 ${size}`} />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          className={`text-richblack-400 ${size}`}
        />
      );
    }

    return stars;
  };

  const isEnrolled = () => {
    return courseData?.studentsEnrolled?.includes(user?._id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-richblack-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <BiBookBookmark className="w-10 h-10 text-richblack-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Course Not Found
          </h2>
          <p className="text-richblack-300 mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate("/catalog")}
            className="bg-gradient-to-r from-blue-600 to-caribbeangreen-600 text-white px-6 py-3"
          >
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  const linkPath = courseData.category?.name.toLowerCase()?.replace(/ /g, "-");

  const averageRating = getAverageRating();
  const ratingDistribution = getRatingDistribution();

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-richblack-800 via-richblack-800 to-richblack-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-caribbeangreen-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Left Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Breadcrumb with better styling */}
              <nav className="flex items-center space-x-2 text-sm">
                <span className="text-richblack-300 hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                  Catalog
                </span>
                <FaChevronRight className="text-richblack-500" size={12} />
                <Link
                  to={`/catalog/${linkPath}`}
                  className="text-richblack-300 hover:text-yellow-200 transition-colors duration-200 cursor-pointer"
                >
                  {courseData.category?.name}
                </Link>
                <FaChevronRight className="text-richblack-500" size={12} />
                <span className="text-yellow-100 font-medium cursor-pointer">
                  {courseData.title}
                </span>
              </nav>

              {/* Title Section */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-50 to-caribbeangreen-100 bg-clip-text text-transparent leading-tight">
                    {courseData.title}
                  </h1>
                  <p className="text-lg text-richblack-200 leading-relaxed max-w-3xl">
                    {courseData.description}
                  </p>
                </div>

                {/* Course Metrics */}
                <div className="flex flex-wrap items-center gap-8 text-richblack-200">
                  <div className="flex items-center space-x-3 bg-richblack-700/50 px-4 py-2 rounded-full backdrop-blur-sm border border-richblack-600">
                    <div className="flex items-center space-x-1">
                      {renderStars(averageRating, "text-sm")}
                    </div>
                    <span className="font-semibold text-yellow-300">
                      {averageRating}
                    </span>
                    <span className="text-richblack-400">
                      ({courseData.ratingsAndReviews?.length || 0})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-caribbeangreen-300" />
                    <span>
                      <strong>
                        {courseData.studentsEnrolled?.length || 0}
                      </strong>{" "}
                      students
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaClock className="text-yellow-300" />
                    <span>
                      <strong>{getEstimatedDuration()}</strong> content
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaVideo className="text-pink-300" />
                    <span>
                      <strong>{getTotalLectures()}</strong> lectures
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaLanguage className="text-blue-300" />
                    <span>{courseData.language}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {courseData.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-caribbeangreen-500/20 text-blue-200 rounded-full text-sm font-medium border border-blue-500/30 hover:border-blue-400/50 transition-colors backdrop-blur-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructor Card */}
              <div className="bg-gradient-to-br from-richblack-700/80 to-richblack-800/80 backdrop-blur-lg rounded-2xl p-5 border border-richblack-600 hover:border-richblack-500 transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <img
                      src={courseData.instructor?.avatar}
                      alt={`${courseData.instructor?.firstName} ${courseData.instructor?.lastName}`}
                      className="w-16 h-16 rounded-2xl border-3 border-richblack-500 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-caribbeangreen-400 rounded-full flex items-center justify-center">
                      <MdVerified className="text-richblack-900 text-sm" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {courseData.instructor?.firstName}{" "}
                      {courseData.instructor?.lastName}
                    </h3>
                    <p className="text-caribbeangreen-200 text-sm font-medium mb-3">
                      Expert Instructor
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-richblack-300">
                      <div className="flex items-center space-x-2">
                        <HiOutlineAcademicCap className="text-blue-400" />
                        <span>
                          <strong>
                            {courseData.instructor?.courses?.length || 0}
                          </strong>{" "}
                          courses
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaUsers className="text-caribbeangreen-400" />
                        <span>Expert level</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MdAccessTime className="text-yellow-400" />
                        <span>
                          Since{" "}
                          {new Date(
                            courseData.instructor?.createdAt
                          ).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-8 space-y-6">
                {/* Course Preview Card */}
                <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-3xl border border-richblack-700 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                  {/* Course Thumbnail with Play Button */}
                  <div className="relative group">
                    <img
                      src={courseData.thumbnailInfo?.objectUrl}
                      alt={courseData.title}
                      className="w-full h-fit object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-caribbeangreen-500 text-richblack-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {getCourseLevel()}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Price Section */}
                    <div className="text-center space-y-3">
                      <div className="space-y-2">
                        <div className="text-3xl font-bold bg-gradient-to-r from-white to-richblack-200 bg-clip-text text-transparent">
                          ₹{courseData.price.toLocaleString()}
                        </div>
                        <p className="text-richblack-300">
                          One-time payment • Lifetime access
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                      {isEnrolled() ? (
                        <Button
                          className="!rounded-xl flex items-center justify-center w-full bg-gradient-to-r 
                          from-caribbeangreen-500 
                          to-caribbeangreen-400 hover:from-caribbeangreen-400 hover:to-caribbeangreen-300 text-richblack-900 

                          font-bold py-4 shadow-lg text-base hover:shadow-caribbeangreen-500/25 transition-all duration-300"
                          onClick={() => navigate(`/view-course/${courseID}`)}
                        >
                          <BiPlay className="mr-2" size={24} />
                          Continue Learning
                        </Button>
                      ) : (
                        <div className="flex gap-5">
                          <Button
                            active
                            className="!rounded-xl flex items-center justify-center w-full font-bold py-4 text-base shadow-lg transition-all
                          duration-300 transform hover:-translate-y-0.5"
                            onClick={handlePurchase}
                          >
                            <MdOutlinePayments className="mr-2" size={24} />
                            Enroll Now
                          </Button>
                          <Button
                            className="!rounded-xl flex items-center justify-center w-full font-bold py-4 text-base shadow-lg transition-all
                          duration-300 transform hover:-translate-y-0.5"
                          >
                            <BiCartAdd className="mr-2" size={24} />
                            Add to cart
                          </Button>
                        </div>
                      )}

                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={shareLink}
                          className="w-full bg-richblack-700 hover:bg-richblack-600 text-richblack-200 hover:text-white py-3 px-4 rounded-xl transition-all duration-200 text-sm font-medium border border-richblack-600 hover:border-richblack-500"
                        >
                          <FaShare className="inline mr-2" />
                          Share
                        </button>
                      </div>
                    </div>

                    {/* Course Includes */}
                    <div className="space-y-6">
                      <h4 className="text-white font-bold text-lg">
                        This course includes:
                      </h4>
                      <ul className="space-y-4">
                        <li className="flex items-center space-x-4 p-3 bg-richblack-700/50 rounded-xl">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <FaVideo className="text-blue-400" />
                          </div>
                          <div>
                            <span className="text-white font-medium">
                              {getTotalLectures()} video lectures
                            </span>
                            <p className="text-richblack-400 text-sm">
                              HD quality content
                            </p>
                          </div>
                        </li>
                        <li className="flex items-center space-x-4 p-3 bg-richblack-700/50 rounded-xl">
                          <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <FaClock className="text-yellow-400" />
                          </div>
                          <div>
                            <span className="text-white font-medium">
                              {getEstimatedDuration()} total content
                            </span>
                            <p className="text-richblack-400 text-sm">
                              Self-paced learning
                            </p>
                          </div>
                        </li>
                        <li className="flex items-center space-x-4 p-3 bg-richblack-700/50 rounded-xl">
                          <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                            <BiTime className="text-pink-400" />
                          </div>
                          <div>
                            <span className="text-white font-medium">
                              Lifetime access
                            </span>
                            <p className="text-richblack-400 text-sm">
                              Learn at your own pace
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Course Quick Stats */}
                    <div className="bg-gradient-to-r from-richblack-700/50 to-richblack-600/50 rounded-xl p-4 border border-richblack-600">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            {getTotalSections()}
                          </div>
                          <div className="text-richblack-300 text-sm">
                            Sections
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">
                            {courseData.studentsEnrolled?.length || 0}
                          </div>
                          <div className="text-richblack-300 text-sm">
                            Students
                          </div>
                        </div>
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
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tab Navigation */}
            <div className="bg-richblack-800/50 backdrop-blur-sm rounded-2xl p-2 border border-richblack-700">
              <div className="flex space-x-2">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "curriculum", label: "Curriculum" },
                  { id: "reviews", label: "Reviews" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-1 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-600 to-caribbeangreen-600 text-white shadow-lg"
                        : "text-richblack-300 hover:text-white hover:bg-richblack-700/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-12">
                {/* What You'll Learn */}
                {courseData.keyFeatures &&
                  courseData.keyFeatures.length > 0 && (
                    <section className="bg-gradient-to-br from-richblack-800/80 to-richblack-700/50 backdrop-blur-sm rounded-3xl p-6 border border-richblack-600">
                      <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                        <div className="w-10 h-10 bg-caribbeangreen-500/20 rounded-xl flex items-center justify-center mr-4">
                          <IoMdSchool className="text-caribbeangreen-400" />
                        </div>
                        What you'll learn
                      </h2>
                      <div className="grid grid-cols-1 gap-3">
                        {courseData.keyFeatures.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 p-4 bg-richblack-700/30 rounded-xl hover:bg-richblack-700/50 transition-colors duration-200"
                          >
                            <div className="w-6 h-6 bg-caribbeangreen-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FaCheck className="text-caribbeangreen-400 text-sm" />
                            </div>
                            <span className="text-richblack-200 leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
              </div>
            )}

            {activeTab === "curriculum" && (
              <section className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                      <BiBookBookmark className="text-blue-400" />
                    </div>
                    Course Curriculum
                  </h2>
                  <div className="bg-richblack-800 px-4 py-2 rounded-xl border border-richblack-700">
                    <span className="text-richblack-300 text-sm">
                      {getTotalSections()} sections • {getTotalLectures()}{" "}
                      lectures • {getEstimatedDuration()}
                    </span>
                  </div>
                </div>

                <div className="bg-richblack-800/50 backdrop-blur-sm rounded-2xl border border-richblack-700 overflow-hidden">
                  {courseData.courseContent?.map((section, index) => (
                    <div
                      key={section._id}
                      className="border-b border-richblack-700 last:border-b-0 p-4"
                    >
                      <button
                        onClick={() => toggleSection(section._id)}
                        className="w-full flex items-center justify-between p-2 mb-2 hover:bg-richblack-700/30 transition-all duration-300 text-left group rounded-xl"
                      >
                        <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-caribbeangreen-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                              {section.sectionName}
                            </h3>
                            <p className="text-richblack-300 mt-1">
                              {section.subSection?.length || 0} lectures
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-richblack-400 text-sm">
                            ~{(section.subSection?.length || 0) * 20}min
                          </span>
                          {expandedSections[section._id] ? (
                            <FaChevronUp className="text-richblack-400 group-hover:text-richblack-200 transition-colors" />
                          ) : (
                            <FaChevronDown className="text-richblack-400 group-hover:text-richblack-200 transition-colors" />
                          )}
                        </div>
                      </button>

                      {expandedSections[section._id] && (
                        <div className="px-1">
                          <div className="space-y-2">
                            {section.subSection?.map(
                              (lecture, lectureIndex) => (
                                <div
                                  key={lecture._id}
                                  className="flex items-center space-x-4 p-3 bg-richblack-700/30 rounded-xl hover:bg-richblack-700/50 transition-colors duration-200 group"
                                >
                                  <div className="w-10 h-10 bg-richblack-600 rounded-lg flex items-center justify-center group-hover:bg-richblack-500 transition-colors">
                                    <BiPlay className="text-richblack-300 group-hover:text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-richblack-200 font-semibold group-hover:text-white transition-colors">
                                      {lecture.title}
                                    </h4>
                                    <p className="text-richblack-400 text-sm mt-1">
                                      {lecture.description}
                                    </p>
                                  </div>
                                  <span className="text-richblack-400 text-sm bg-richblack-800 px-3 py-1 rounded-full">
                                    ~20min
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "reviews" && (
              <section className="space-y-8">
                {/* Reviews Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4">
                      <FaStar className="text-yellow-400" />
                    </div>
                    Student Reviews
                  </h2>
                </div>

                {/* Rating Overview */}
                <div className="bg-gradient-to-br from-richblack-800/80 to-richblack-700/50 backdrop-blur-sm rounded-3xl p-10 border border-richblack-600">
                  <div className="grid md:grid-cols-2 gap-12">
                    {/* Average Rating */}
                    <div className="text-center space-y-4">
                      <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                        {averageRating}
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        {renderStars(averageRating, "text-2xl")}
                      </div>
                      <p className="text-richblack-300 text-lg">
                        Based on {courseData.ratingsAndReviews?.length || 0}{" "}
                        reviews
                      </p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-4">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratingDistribution[5 - star] || 0;
                        const percentage = courseData.ratingsAndReviews?.length
                          ? (count / courseData.ratingsAndReviews.length) * 100
                          : 0;

                        return (
                          <div
                            key={star}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex items-center space-x-2 w-20">
                              <span className="text-richblack-200 font-medium">
                                {star}
                              </span>
                              <FaStar className="text-yellow-400 text-sm" />
                            </div>
                            <div className="flex-1 bg-richblack-700 rounded-full h-3 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-1000"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-richblack-300 text-sm w-12 text-right">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {courseData.ratingsAndReviews &&
                  courseData.ratingsAndReviews.length > 0 ? (
                    courseData.ratingsAndReviews.map((review, index) => (
                      <div
                        key={index}
                        className="bg-richblack-800/50 backdrop-blur-sm rounded-2xl p-8 border border-richblack-700 hover:border-richblack-600 transition-all duration-300"
                      >
                        <div className="flex items-start space-x-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-caribbeangreen-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              {review.user?.firstName?.charAt(0) || "U"}
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-semibold text-lg">
                                  {review.user?.firstName}{" "}
                                  {review.user?.lastName || "Anonymous"}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  {renderStars(review.rating || 0, "text-sm")}
                                  <span className="text-richblack-400 text-sm">
                                    {formatDate(review.createdAt || new Date())}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-richblack-200 leading-relaxed">
                              {review.review ||
                                "Great course! Highly recommended."}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-richblack-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaStar className="w-10 h-10 text-richblack-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        No Reviews Yet
                      </h3>
                      <p className="text-richblack-300 mb-6">
                        Be the first to review this course and help other
                        students!
                      </p>
                      {isEnrolled() && (
                        <Button className="bg-gradient-to-r from-blue-600 to-caribbeangreen-600 text-white px-8 py-3">
                          Write a Review
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Instructor's Other Courses */}
            {courseData.instructor?.courses &&
              courseData.instructor.courses.length > 1 && (
                <section className="space-y-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                      <HiOutlineAcademicCap className="text-blue-400" />
                    </div>
                    More courses from{" "}
                    {courseData.instructor.firstName +
                      " " +
                      courseData.instructor.lastName}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {courseData.instructor.courses
                      .filter((course) => course._id !== courseData._id)
                      .slice(0, 4)
                      .map((course) => (
                        <div
                          key={course._id}
                          className="group bg-richblack-800/50 backdrop-blur-sm rounded-2xl border border-richblack-700 overflow-hidden hover:border-richblack-600 hover:shadow-xl transition-all duration-500"
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={course.thumbnailInfo?.objectUrl}
                              alt={course.title}
                              className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-6 space-y-4">
                            <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-blue-200 transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-richblack-300 text-sm line-clamp-2">
                              {course.description}
                            </p>
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-2xl font-bold bg-gradient-to-r from-caribbeangreen-400 to-blue-400 bg-clip-text text-transparent">
                                ₹{course.price.toLocaleString()}
                              </span>
                              <button
                                onClick={() =>
                                  navigate(`/course/${course._id}`)
                                }
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors group-hover:underline"
                              >
                                View Course →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Course Information */}
            <div className="bg-gradient-to-br from-richblack-800/80 to-richblack-700/50 backdrop-blur-sm rounded-2xl p-8 border border-richblack-600 sticky top-8">
              <h3 className="text-richblack-50 font-bold text-xl mb-6">
                Course Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-richblack-700/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FaUsers className="text-caribbeangreen-400" />
                    <span className="text-richblack-300">Students</span>
                  </div>
                  <span className="text-richblack-50 font-semibold">
                    {courseData.studentsEnrolled?.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-richblack-700/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FaLanguage className="text-blue-400" />
                    <span className="text-richblack-300">Language</span>
                  </div>
                  <span className="text-richblack-50 font-semibold">
                    {courseData.language}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-richblack-700/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FaClock className="text-yellow-400" />
                    <span className="text-richblack-300">Duration</span>
                  </div>
                  <span className="text-richblack-50 font-semibold">
                    {getEstimatedDuration()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-richblack-700/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <MdAccessTime className="text-pink-400" />
                    <span className="text-richblack-300">Last Updated</span>
                  </div>
                  <span className="text-richblack-50 font-semibold">
                    {formatDate(courseData.updatedAt).split(",")[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-richblack-700/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <BiBookBookmark className="text-purple-400" />
                    <span className="text-richblack-300">Category</span>
                  </div>
                  <span className="text-richblack-50 font-semibold">
                    {courseData.category?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CourseDetails;
