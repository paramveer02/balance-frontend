import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { AllowanceForm, IntroScreen, TaskDetail } from "./pages/application";
import { About, Home, Login, SignUp } from "./pages/website";
import MainLayout from "./layouts/MainLayout";
import StyleGuide from "./pages/StyleGuide";
import { onboardingSteps } from "./data/onboardingData";

const App = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStepIndex < onboardingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      console.log("Onboarding completed!");
      navigate("/allowance");
    }
  };
  // Get current step data
  const currentStepData = onboardingSteps[currentStepIndex];

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
      <Route
        path="/intro"
        element={
          <IntroScreen
            title={currentStepData.title}
            description={currentStepData.description}
            buttonText={currentStepData.buttonText}
            currentStep={currentStepData.currentStep}
            totalSteps={currentStepData.totalSteps}
            onNext={handleNext}
            imageUrl={currentStepData.imageUrl}
          />
        }
      />
    </Routes>
  );
};

export default App;
