import { Outlet } from "react-router";
import { Navbar } from "../components";
import { Footer } from "../components";

const MainLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
