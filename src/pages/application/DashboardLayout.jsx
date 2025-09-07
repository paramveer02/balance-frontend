import { Outlet, redirect, useLoaderData, useLocation } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import DashboardContextProvider from "../../context/DashboardContext";
import { Footer, Navbar } from "../../components";
import { isOnboardingCompleted } from "../../utils/onboardingUtils";

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return { user: data.user };
  } catch (error) {
    return redirect("/login");
  }
};

export const dashboardIntroLoader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return { user: data.user };
  } catch (error) {
    return redirect("/login");
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const location = useLocation();
  
  // Hide navbar during onboarding flow
  const isOnboardingPage = location.pathname === "/dashboard/intro";

  return (
    <DashboardContextProvider initialUser={user}>
      <main>
        {!isOnboardingPage && <Navbar />}
        <Outlet context={{ user }} />
        {!isOnboardingPage && <Footer />}
      </main>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
