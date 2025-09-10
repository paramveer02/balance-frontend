import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components";
import { Footer } from "../components";

const MainLayout = () => {
  const location = useLocation();

  // Only show navbar on public pages (not login, signup, forgot password, reset password, or dashboard pages)
  const showNavbar =
    !location.pathname.startsWith("/dashboard") &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/forget-password" &&
    location.pathname !== "/reset-password/:token";

  // Only show footer on public pages (not dashboard pages)
  const showFooter = !location.pathname.startsWith("/dashboard");

  return (
    <div>
      {showNavbar && <Navbar />}
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
