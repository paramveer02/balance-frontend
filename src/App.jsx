import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  dashboardLoader,
  IntroScreen,
  TaskDetail,
  Report,
} from "./pages/application";
import Error404 from "./pages/Error404";
import MainLayout from "./layouts/MainLayout";

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
      {
        path: "intro",
        element: <IntroScreen />,
      },
      {
        path: "allowance",
        element: <AllowanceForm />,
      },
      {
        path: "aiplan",
        element: <AIPlan />,
      },
      // Protected: /dashboard
      {
        id: "dashboard",
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        children: [{ path: "report", element: <Report /> }],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
