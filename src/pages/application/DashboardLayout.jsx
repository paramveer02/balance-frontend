import { Outlet, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import DashboardContextProvider from "../../context/DashboardContext";
import { Footer, Navbar } from "../../components";

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return { user: data.user };
  } catch (error) {
    return redirect("/login");
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();

  return (
    <DashboardContextProvider initialUser={user}>
      <main>
        <Navbar />
        <Outlet context={{ user }} />
        <Footer />
      </main>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
