const IntroScreen = ({
  title,
  description,
  buttonText = "Next",
  currentStep = 1,
  totalSteps = 3,
  onNext,
  imageUrl,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        <div className="w-full h-90 mb-12 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Step ${currentStep} illustration`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`w-full h-full flex items-center justify-center text-gray-400 text-lg font-medium ${
              imageUrl ? "hidden" : "flex"
            }`}
          >
            Image
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex space-x-2 mb-8">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index + 1 === currentStep ? "bg-emerald-700" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-left mb-12">
          <h3 className="text-gray-900 mb-4 leading-tight">{title}</h3>
          <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full bg-[#009b7a] hover:bg-emerald-800 text-white text-lg py-4 px-6 rounded-full transition-colors duration-200 shadow-sm"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
