import Home from "./pages/website/Home";
import About from "./pages/website/About";
import MainLayout from "./layouts/MainLayout";
// import { Routes, Route } from "react-router";
import Login, { loginAction } from "./pages/website/Login";
import SignUp, { signupAction } from "./pages/website/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404 from "./pages/Error404";
import { rootLoader } from "./routes/loader";
import { logoutAction } from "./routes/action";
import Dashboard, { dashboardLoader } from "./pages/application/Dashboard";
import Report from "./pages/application/Report";

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
