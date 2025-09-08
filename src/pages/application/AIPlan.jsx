// AIPLAN
import { useState } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import customFetch from "../../utils/customFetch";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const loaderUrl = "/lottie/loader.lottie";

const AIPlan = () => {
  const data = localStorage.getItem("AIPlan");
  const planFromStorage = data ? JSON.parse(data) : null;
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const weeklyAllowanceScore = planFromStorage.TNW;
  const [busy, setBusy] = useState(false);

  //Data for health action plan
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
  const totalScore = weeklyAllowanceScore + healthActScore;
  const greenPercentage =
    totalScore > 0 ? (healthActScore / totalScore) * 100 : 0;
  const redPercentage =
    totalScore > 0 ? (weeklyAllowanceScore / totalScore) * 100 : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data to be sent to backend
      const weekStartDate = new Date(); // Use current date as week start
      weekStartDate.setHours(0, 0, 0, 0); // Set to start of the day

      // Format health acts for backend
      const formattedHealthActs = healthActPlan.map((act) => ({
        name: act.name,
        emoji: act.emoji,
        category: act.category,
        weight: act.weight,
        frequency: act.frequency,
        relatedIndulgenceKey: act.relatedIndulgenceKey || null,
      }));

      // Format indulgences from the original plan
      const formattedIndulgences = planFromStorage.weeklyAllowances.map(
        (allowance) => ({
          name: allowance.name,
          emoji: allowance.emoji,
          category: allowance.category,
          weight: allowance.weight,
          frequency: allowance.frequency,
        })
      );

      const planData = {
        weekStartDate: weekStartDate.toISOString(),
        indulgences: formattedIndulgences,
        healthActs: formattedHealthActs,
      };

      setBusy(true);
      await new Promise((res) => setTimeout(res, 2000));
      const response = await customFetch.post("/plan/create", planData);

      if (response.data.success) {
        // Store plan ID for later use
        localStorage.setItem("currentPlanId", response.data.plan._id);
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        alert("Failed to create plan. Please try again.");
      }
    } catch (error) {
      alert("Error creating plan. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {busy && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <DotLottieReact
              src={loaderUrl}
              autoplay
              loop
              style={{ width: 160, height: 160 }}
            />
            <p className="mt-3 text-slate-100">Time to get started...</p>
          </div>
        </div>
      )}
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
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    opacity: act.frequency === 0 ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (act.frequency !== 0) {
                      e.target.style.backgroundColor = "#4C3CF0";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (act.frequency !== 0) {
                      e.target.style.backgroundColor = "var(--secondary-color)";
                    }
                  }}
                  disabled={act.frequency === 0}
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>

                <span className="w-4 text-center text-md">{act.frequency}</span>

                <button
                  type="button"
                  onClick={() => updateFrequency(act.name, 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    opacity: act.frequency === 7 ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (act.frequency !== 7) {
                      e.target.style.backgroundColor = "#4C3CF0";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (act.frequency !== 7) {
                      e.target.style.backgroundColor = "var(--secondary-color)";
                    }
                  }}
                  disabled={act.frequency === 7}
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <button
          onClick={handleSubmit}
          className="w-full text-white font-semibold py-4 rounded-full text-lg transition-colors"
          style={{
            backgroundColor: "var(--primary-color)",
            "--tw-bg-opacity": "1",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#007A5E";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--primary-color)";
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AIPlan;
