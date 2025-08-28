import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const DashboardContext = createContext();

const DashboardContextProvider = ({ children, initialUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const logoutUser = async () => {
    try {
      await customFetch.get("/auth/logout");
    } catch {}
    setUser(null);
    toast.success("Logged Out Successfully");
    navigate("/");
  };

  return (
    <DashboardContext.Provider value={{ logoutUser, user }}>
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardContextProvider;
