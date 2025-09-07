import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onboardingSteps } from "../../data/onboardingData";
import { 
  getCurrentOnboardingStep, 
  setCurrentOnboardingStep, 
  markOnboardingCompleted 
} from "../../utils/onboardingUtils";

const IntroScreen = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigate = useNavigate();

  // Load current step from localStorage on component mount
  useEffect(() => {
    const savedStep = getCurrentOnboardingStep();
    setCurrentStepIndex(savedStep);
  }, []);

  const handleNext = () => {
    if (currentStepIndex < onboardingSteps.length - 1) {
      const nextStep = currentStepIndex + 1;
      setCurrentStepIndex(nextStep);
      setCurrentOnboardingStep(nextStep);
    } else {
      // Onboarding completed
      markOnboardingCompleted();
      navigate("/dashboard");
    }
  };

  // Get current step data
  const currentStepData = onboardingSteps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        <div className="w-full h-90 mb-12 overflow-hidden">
          {currentStepData.imageUrl ? (
            <img
              src={currentStepData.imageUrl}
              alt={`Step ${currentStepData.currentStep} illustration`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`w-full h-full flex items-center justify-center text-gray-400 text-lg font-medium ${
              currentStepData.imageUrl ? "hidden" : "flex"
            }`}
          >
            Image
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex space-x-2 mb-8">
          {Array.from({ length: currentStepData.totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStepIndex ? "bg-emerald-700" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-left mb-12 ">
          <h3 className="text-gray-900 mb-4 leading-tight">{currentStepData.title}</h3>
          <p className="text-lg text-gray-700 leading-relaxed">{currentStepData.description}</p>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-[#009b7a] hover:bg-emerald-800 text-white text-lg py-4 px-6 rounded-full transition-colors duration-200 shadow-sm"
        >
          {currentStepData.buttonText}
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
