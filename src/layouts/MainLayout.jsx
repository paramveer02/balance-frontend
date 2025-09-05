import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components";
import { Footer } from "../components";

const MainLayout = () => {
  const location = useLocation();
  
  // Only show navbar on public pages (not login, signup, or dashboard pages)
  const showNavbar = !location.pathname.startsWith('/dashboard') && 
                     location.pathname !== '/login' && 
                     location.pathname !== '/signup';
  
  return (
    <div>
      {showNavbar && <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
