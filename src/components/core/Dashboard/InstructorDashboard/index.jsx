import { useEffect, useState } from "react";
import { fetchInstructorDashboardData } from "../../../../services/operations/dashboardApi";
import {
  FaUsers,
  FaBookOpen,
  FaRupeeSign,
  FaStar,
  FaMoneyCheck,
} from "react-icons/fa6";
import { format } from "date-fns";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Spinner from "../../../ui/spinner/Spinner";

// Stats Card
function HeadlineMetric({ icon, label, value, trend }) {
  return (
    <div className="bg-richblack-800 border border-richblack-700 rounded-xl p-5 flex flex-col gap-2 min-w-[160px]">
      <div className="flex items-center space-x-3">
        <div className="bg-richblack-700 rounded-lg p-2 text-yellow-50">
          {icon}
        </div>
        <p className="text-xs text-richblack-300">{label}</p>
      </div>
      <div className="flex items-center text-2xl font-extrabold text-white">
        {value}
        {trend}
      </div>
    </div>
  );
}

export default function InstructorDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchInstructorDashboardData().then((response) => {
      setDashboard(response?.data || null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-richblack-300">
        <Spinner />
      </div>
    );
  }
  if (!dashboard) {
    return (
      //   <div className="text-center text-pink-400">Failed to load dashboard</div>
      <div className="h-screen w-full flex items-center justify-center text-richblack-300">
        <Spinner />
      </div>
    );
  }

  // ===== Data Extraction =====
  const instructor = dashboard.instructorData;
  const courses = dashboard.courseData || [];
  // Sort courses by last update desc
  courses.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // Aggregate headline metrics, with trends (using last 2 weeks if possible)
  const totalEarnings = courses.reduce((a, c) => a + (c.totalEarnings || 0), 0);
  const studentCounts = courses.map((c) => c.totalStudentsEnrolled || 0);
  const totalStudents = studentCounts.reduce((a, c) => a + c, 0);

  const coursesPublished = courses.length;

  // Earnings by month for this year
  const earningsByMonth = Array(12).fill(0);
  const enrollmentsByMonth = Array(12).fill(0);
  courses.forEach((course) => {
    // Earnings
    if (course.updatedAt) {
      const d = new Date(course.updatedAt);
      earningsByMonth[d.getMonth()] += course.totalEarnings || 0;
      enrollmentsByMonth[d.getMonth()] += course.totalStudentsEnrolled || 0;
    }
  });

  // Earnings by course (for chart)
  const courseTitles = courses.map((c) =>
    c.title.length > 16 ? c.title.slice(0, 15) + "…" : c.title
  );
  const earningsPerCourse = courses.map((c) => c.totalEarnings || 0);

  // Students by course
  const studentsPerCourse = courses.map((c) => c.totalStudentsEnrolled || 0);

  // Ratings distribution for chart
  const ratingsArr = courses.flatMap((c) => c.ratingsAndReviews || []);
  const ratingsDist = [0, 0, 0, 0, 0]; // 1-star to 5-star
  ratingsArr.forEach((r) => ratingsDist[Math.min(r.rating, 5) - 1]++);

  const avgRating =
    ratingsArr.reduce((total, rating) => {
      return total + rating.rating;
    }, 0) / ratingsArr.length;

  // "Recent" activity: last updates, enrollments, new courses
  const recentCourses = courses.slice(0, 4);

  // ===== Chart Data Objects (Chart.js ready) =====
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const earningsTrendData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Earnings",
        data: earningsByMonth,
        tension: 0.4,
        borderColor: "#FFD60A",
        // borderColor: "#06D6A0",
        backgroundColor: "rgba(6,214,160,0.12)",
        pointRadius: 3,
      },
    ],
  };

  const enrollmentsTrendData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Enrollments",
        data: enrollmentsByMonth,
        tension: 0.4,
        borderColor: "#E7C009",
        backgroundColor: "#FFD60A",
        pointRadius: 3,
      },
    ],
  };

  const earningsPerCourseData = {
    labels: courseTitles,
    datasets: [
      {
        label: "Earnings",
        data: earningsPerCourse,
        backgroundColor: courseTitles.map(
          (_, i) => `hsl(${(i * 35) % 360},60%,50%)`
        ),
      },
    ],
  };

  const studentsPerCourseData = {
    labels: courseTitles,
    datasets: [
      {
        label: "Students",
        data: studentsPerCourse,
        backgroundColor: courseTitles.map(
          (_, i) => `hsl(${(i * 35 + 180) % 360},70%,55%)`
        ),
      },
    ],
  };

  const ratingsDistributionData = {
    labels: ["5★", "4★", "3★", "2★", "1★"],
    datasets: [
      {
        label: "Reviews",
        data: ratingsDist.slice().reverse(),
        backgroundColor: [
          "#FFD600",
          "#AEEA00",
          "#00B8D4",
          "#78909C",
          "#FF1744",
        ],
      },
    ],
  };

  // ===== Dashboard Layout =====
  return (
    <div className="w-full min-h-screen bg-richblack-900 text-richblack-5 p-6">
      {/* HEADER */}
      <div className="flex justify-between flex-wrap mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome, {instructor.firstName}{" "}
            <span role="img" aria-label="waving">
              👋
            </span>
          </h1>
          <p className="text-richblack-300 mt-1">
            All your teaching insights, at a glance.
          </p>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <HeadlineMetric
          icon={<FaBookOpen size={22} />}
          label="Courses Published"
          value={coursesPublished}
        />
        <HeadlineMetric
          icon={<FaUsers size={22} />}
          label="Total Students"
          value={totalStudents}
        />
        <HeadlineMetric
          icon={<FaMoneyCheck size={22} />}
          label="Total Earnings"
          value={"₹" + totalEarnings.toLocaleString()}
        />
        <HeadlineMetric
          icon={<FaStar size={22} />}
          label="Avg. Rating"
          value={avgRating || "0.0"}
        />
      </div>

      {/* ANALYTICS CHARTS */}
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8 mb-10">
        <div className="bg-richblack-800 border border-richblack-700 p-6 rounded-xl col-span-2 flex flex-col justify-between min-h-[380px]">
          <h2 className="text-lg font-bold mb-3">Earnings Trend (This Year)</h2>
          <Line
            data={earningsTrendData}
            className="yellow-50"
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>
        <div className="grid md:grid-cols-3 space-y-8 md:space-x-8 md:space-y-0">
          <div className="bg-richblack-800 border border-richblack-700 p-6 rounded-xl col-span-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Ratings Distribution</h2>
              <span className="text-xs text-richblack-400">
                {ratingsArr.length} total ratings
              </span>
            </div>
            <Doughnut
              data={ratingsDistributionData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#fff", font: { size: 12 } },
                  },
                },
              }}
            />
          </div>
          <div className="bg-richblack-800 w-full border border-richblack-700 p-6 rounded-xl md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Enrollments Trend</h2>
            </div>
            <Bar
              data={enrollmentsTrendData}
              options={{ plugins: { legend: { display: false } } }}
            />
          </div>
        </div>
      </div>

      {/* SALES & STUDENT BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-richblack-800 border border-richblack-700 p-6 rounded-xl min-h-[340px]">
          <h2 className="text-lg font-bold mb-3">Earnings by Course</h2>
          <Bar
            data={earningsPerCourseData}
            options={{
              plugins: { legend: { display: false } },
              indexAxis: "y",
              responsive: true,
              scales: {
                x: { ticks: { color: "#fff" } },
                y: { ticks: { color: "#fff" } },
              },
            }}
          />
        </div>
        <div className="bg-richblack-800 border border-richblack-700 p-6 rounded-xl min-h-[340px]">
          <h2 className="text-lg font-bold mb-3">Student Distribution</h2>
          <Bar
            data={studentsPerCourseData}
            options={{
              plugins: { legend: { display: false } },
              indexAxis: "y",
              responsive: true,
              scales: {
                x: { ticks: { color: "#fff" } },
                y: { ticks: { color: "#fff" } },
              },
            }}
          />
        </div>
      </div>

      {/* INSIGHTS & ACTIVITY */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-richblack-800 border border-richblack-700 p-6 rounded-xl">
          <h2 className="text-lg font-bold mb-4">Recent Courses Activity</h2>
          <ul className="divide-y divide-richblack-700">
            {recentCourses.map((course) => (
              <li
                key={course._id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={course.thumbnailInfo?.objectUrl}
                    alt={course.title}
                    loading="lazy"
                    className="w-[90px] h-14 rounded object-cover border border-richblack-600"
                  />
                  <div>
                    <p className="text-richblack-5 font-medium">
                      {course.title}
                    </p>
                    <p className="text-richblack-400 text-xs">
                      Last updated:{" "}
                      {format(new Date(course.updatedAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-richblack-100 font-medium">
                    {course.status}
                  </span>
                  <span className="text-richblack-300 text-xs">
                    {course.totalStudentsEnrolled} students
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
