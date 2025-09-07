import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  About,
  Home,
  Login,
  loginAction,
  SignUp,
  signupAction,
} from "./pages/website";
import {
  AllowanceForm,
  AIPlan,
  Dashboard,
  DashboardLayout,
  dashboardLoader,
  dashboardIntroLoader,
  IntroScreen,
  TaskDetail,
  Report,
} from "./pages/application";
import { onboardingSteps } from "./data/onboardingData";

import Error404 from "./pages/Error404";
import MainLayout from "./layouts/MainLayout";

// Import debug utilities for development
import "./utils/onboardingDebug";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "signup",
        element: <SignUp />,
        action: signupAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },

      // Protected: /dashboard
      {
        id: "dashboard",
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "about", element: <About /> },
          { path: "report", element: <Report /> },
          {
            path: "intro",
            element: <IntroScreen />,
            loader: dashboardIntroLoader,
          },
          {
            path: "allowance",
            element: <AllowanceForm />,
          },
          {
            path: "aiplan",
            element: <AIPlan />,
          },
          {
            path: "detail",
            element: <TaskDetail />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
