import { useRoutes } from "react-router-dom";
import { lazy } from "react";

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
const EnrolledCourses = lazy(() =>
  import("../components/core/Dashboard/EnrolledCourses")
);
const Settings = lazy(() => import("../components/core/Dashboard/Settings"));
const Cart = lazy(() => import("../components/core/Dashboard/Cart"));
const AddCourse = lazy(() => import("../components/core/Dashboard/AddCourse"));
const BlankLayout = lazy(() => import("../components/core/Layout/BlankLayout"));

const Router = () => {
  const routes = useRoutes([
    {
      path: "*",
      index: true,
      element: <BlankLayout />,
      children: [
        {
          path: "/",
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
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "/my-profile",
              element: <MyProfile />,
            },
            {
              path: "/enrolled-courses",
              element: <EnrolledCourses />,
            },
            {
              path: "/purchase-history",
              element: <EnrolledCourses />,
            },
            {
              path: "/settings",
              element: <Settings />,
            },
            {
              path: "/cart",
              element: <Cart />,
            },
            {
              path: "/add-course",
              element: <AddCourse />,
            },
          ],
        },
      ],
    },
  ]);

  return routes;
};

export default Router;
