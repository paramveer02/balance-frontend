import { useState, useEffect } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";

const AIPlan = () => {
  const data = localStorage.getItem("AIPlan");
  const planFromStorage = data ? JSON.parse(data) : null;
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const weeklyAllowanceScore = planFromStorage.TNW;

  //Dummy data for health action plan
  const [healthActPlan, setHealthActPlan] = useState(
    planFromStorage.balanceMoves
  );

  // Calculate total healthAct score
  const calculateHealthScore = () => {
    return healthActPlan.reduce(
      (total, act) => total + act.frequency * act.weight,
      0
    );
  };
  console.log(healthActPlan);

  // Update frequency for a specific health act
  const updateFrequency = (name, change) => {
    setHealthActPlan((prev) =>
      prev.map((act) => {
        if (act.name === name) {
          const newFrequency = Math.max(0, Math.min(act.frequency + change, 7));
          return { ...act, frequency: newFrequency };
        }
        return act;
      })
    );
  };
  const healthActScore = calculateHealthScore();
  console.log(healthActScore);
  const totalScore = weeklyAllowanceScore + healthActScore;
  const greenPercentage =
    totalScore > 0 ? (healthActScore / totalScore) * 100 : 0;
  const redPercentage =
    totalScore > 0 ? (weeklyAllowanceScore / totalScore) * 100 : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Prepare data to be sent to backend
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-2">Analysis & Plan</h1>

        {/* Analysis Card */}
        <div className="bg-gray-50 rounded-3xl p-6 mb-8">
          <div className="flex items-start gap-2 mb-4">
            <span className="text-xl">💡</span>
            <h4 className="font-semibold">Analysis</h4>
          </div>
          <p
            className={`text-gray-700 leading-relaxed mb-4 ${
              !showFullAnalysis ? "line-clamp-3" : ""
            }`}
          >
            {planFromStorage.summary}
          </p>
          <button
            onClick={() => setShowFullAnalysis(!showFullAnalysis)}
            className="text-gray-500 font-medium flex items-center gap-1"
          >
            {showFullAnalysis ? "Read less" : "Read more"}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFullAnalysis ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Health Acts Plan Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-center mb-2">
            Your balance moves
          </h3>
          <p className="text-gray-500 text-center mb-8">
            You can further customize the frequencies
            <br />
            based on your schedule.
          </p>

          {/* Progress Bar */}
          <div className="mb-3">
            <h4 className="text-center font-semibold mb-3">
              {healthActScore < weeklyAllowanceScore
                ? "Need more health acts!"
                : healthActScore === weeklyAllowanceScore
                ? "Perfect balance!"
                : "Great progress!"}
            </h4>
            <div className="h-6 flex items-center">
              <div
                className="h-6 rounded-l-full bg-[#0CA678] transition-all duration-300 ease-out"
                style={{ width: `${greenPercentage}%` }}
              />
              <div className="bg-gray-300 w-1 h-8 rounded-full" />
              <div
                className="h-6 rounded-r-full bg-[#E03131] transition-all duration-300 ease-out"
                style={{ width: `${redPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className=" text-[#0CA678]">Health act</span>
              <span className=" text-[#E03131]">Weekly allowance</span>
            </div>
          </div>
        </div>

        {/* Health Acts List */}
        <div className="space-y-6 mb-8">
          {healthActPlan.map((act) => (
            <div
              key={act.name}
              className="bg-gray-50 rounded-xl px-4 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xl">{act.emoji}</span>
                <span className=" text-gray-700">{act.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateFrequency(act.name, -1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300  active:bg-gray-500 transition-colors"
                  disabled={act.frequency === 0}
                >
                  <Minus className="w-4 h-4 text-gray-400" />
                </button>

                <span className="w-4 text-center text-md">{act.frequency}</span>

                <button
                  type="button"
                  onClick={() => updateFrequency(act.name, 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300  active:bg-gray-500 transition-colors"
                  disabled={act.frequency === 7}
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <button className="w-full bg-blue-600 text-white font-semibold py-4 rounded-full text-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AIPlan;
