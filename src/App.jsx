import Home from "./pages/website/Home";
import About from "./pages/website/About";
import MainLayout from "./layouts/MainLayout";
import StyleGuide from "./pages/StyleGuide";
import TaskDetail from "./pages/application/TaskDetail";
import { AllowanceForm } from "./pages/application";
import { Routes, Route } from "react-router";

import Login from "./pages/website/Login";
import SignUp from "./pages/website/SignUp";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route path="/style" element={<StyleGuide />} />
      <Route path="/detail" element={<TaskDetail />} />
      <Route path="/allowance" element={<AllowanceForm />} />
    </Routes>
  );
};

export default App;
