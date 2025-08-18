import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import MyCourses from "../components/core/Dashboard/MyCourses";
import EditCourse from "../components/core/Dashboard/EditCourse";
import CourseDetails from "../pages/CourseDetails";
import ViewCourse from "../pages/ViewCourse";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const MyProfile = lazy(() => import("../components/core/Dashboard/MyProfile"));
const InstructorDashboard = lazy(() =>
  import("../components/core/Dashboard/InstructorDashboard")
);
const EnrolledCourses = lazy(() =>
  import("../components/core/Dashboard/EnrolledCourses")
);
const PurchaseHistory = lazy(() =>
  import("../components/core/Dashboard/PurchaseHistory")
);
const VideoContainer = lazy(() =>
  import("../components/core/ViewCourse/VideoContainer")
);
const Settings = lazy(() => import("../components/core/Dashboard/Settings"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const Catalog = lazy(() => import("../pages/Catalog"));
const Cart = lazy(() => import("../components/core/Dashboard/Cart"));
const AddCourse = lazy(() => import("../components/core/Dashboard/AddCourse"));
const BlankLayout = lazy(() => import("../components/core/Layout/BlankLayout"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <BlankLayout />,
      children: [
        {
          path: "/",
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/reset-password/:token",
          element: <ResetPassword />,
        },
        {
          path: "/verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "/catalog/",
          element: <Catalog />,
        },
        {
          path: "/catalog/:catalogName",
          element: <CategoryPage />,
        },
        {
          path: "/course/:courseID",
          element: <CourseDetails />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
        {
          path: "/view-course/:courseID",
          element: (
            <ProtectedRoute
              allowedRole={["Admin", "Student"]}
              element={<ViewCourse />}
            />
          ),
          children: [
            {
              index: true,
              path: "/view-course/:courseID/section/:sectionID/subSection/:subSectionID",
              element: <VideoContainer />,
            },
          ],
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute
              allowedRole={["Admin", "Instructor", "Student"]}
              element={<Dashboard />}
            />
          ),
          children: [
            {
              path: "/dashboard/",
              element: <Navigate to="/dashboard/my-profile" replace={true} />,
            },
            {
              path: "/dashboard/instructor",
              element: (
                <ProtectedRoute
                  allowedRole={["Instructor", "Admin"]}
                  element={<InstructorDashboard />}
                />
              ),
            },
            {
              path: "/dashboard/my-profile",
              element: <MyProfile />,
            },
            {
              path: "/dashboard/my-courses",
              element: <MyCourses />,
            },
            {
              path: "/dashboard/edit-course/:courseID",
              element: <EditCourse />,
            },
            {
              path: "/dashboard/enrolled-courses",
              element: <EnrolledCourses />,
            },
            {
              path: "/dashboard/purchase-history",
              element: <PurchaseHistory />,
            },
            {
              path: "/dashboard/settings",
              element: <Settings />,
            },
            {
              path: "/dashboard/cart",
              element: (
                <ProtectedRoute allowedRole={["Student"]} element={<Cart />} />
              ),
            },
            {
              path: "/dashboard/add-course",
              element: (
                <ProtectedRoute
                  allowedRole={["Admin", "Instructor"]}
                  element={<AddCourse />}
                />
              ),
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return routes;
};

export default Router;
