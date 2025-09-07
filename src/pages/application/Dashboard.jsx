// Dashboard

import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import customFetch from "../../utils/customFetch";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const loaderUrl = "/lottie/loader.lottie";

const Dashboard = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  // Refresh data when user returns to dashboard (e.g., after check-in)
  useEffect(() => {
    const handleFocus = () => {
      fetchCurrentPlan();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const fetchCurrentPlan = async () => {
    try {
      const { data } = await customFetch.get("/plan/current");
      if (data.success) {
        setCurrentPlan(data.plan);
      }
    } catch (error) {
      console.log("No current plan found");
    } finally {
      setLoading(false);
    }
  };

  const handleHealthActClick = async (planId, healthActId) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    navigate(`/dashboard/detail?planId=${planId}&healthActId=${healthActId}`);
  };

  const handleTerminatePlan = async () => {
    if (
      window.confirm(
        "Are you sure you want to terminate your current plan? Your progress will be saved."
      )
    ) {
      try {
        const response = await customFetch.post("/plan/terminate");
        if (response.data.success) {
          alert("Plan terminated successfully!");
          // Refresh the dashboard
          window.location.reload();
        }
      } catch (error) {
        console.error("Error terminating plan:", error);
        alert("Failed to terminate plan. Please try again.");
      }
    }
  };

  // Calculate balance percentage
  const calculateBalancePercentage = () => {
    if (!currentPlan) return 0;

    // Calculate total indulgence score (target) - using absolute values since indulgences have negative weights
    const totalIndulgenceScore = currentPlan.indulgences.reduce(
      (total, indulgence) => {
        const score =
          (indulgence.frequency || 0) * Math.abs(indulgence.weight || 0);
        return total + score;
      },
      0
    );

    // Calculate completed health act score - using targetFrequency field
    const completedHealthActScore = currentPlan.healthActs.reduce(
      (total, healthAct) => {
        const completedCount = healthAct.checkIns
          ? healthAct.checkIns.length
          : 0;
        const completedFrequency = Math.min(
          completedCount,
          healthAct.targetFrequency || 0
        );
        const score = completedFrequency * (healthAct.weight || 0);
        return total + score;
      },
      0
    );

    // Calculate balance percentage
    if (totalIndulgenceScore === 0) {
      return 100; // No indulgences to balance
    }

    if (completedHealthActScore === 0) {
      return 0; // No health acts completed yet
    }

    const balancePercentage =
      (completedHealthActScore / totalIndulgenceScore) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, balancePercentage));

    return Math.round(clampedPercentage);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <DotLottieReact
            src={loaderUrl}
            autoplay
            loop
            style={{ width: 160, height: 160 }}
          />
          <p className="mt-3 text-slate-100">
            {showReport
              ? "Fetching your Report"
              : "Loading Your Health Plan..."}{" "}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">
              Track your health journey and stay balanced
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Terminate plan (existing) */}
            <button
              onClick={handleTerminatePlan}
              className="btn btn-sm btn-ghost px-4 py-3 rounded-full transition-colors text-sm"
            >
              Terminate Plan
            </button>
          </div>
        </div>

        {currentPlan ? (
          <div>
            {/* Balance Chart */}
            {(() => {
              const balancePercentage = calculateBalancePercentage();
              const clampedPercentage = Math.max(
                0,
                Math.min(100, balancePercentage)
              );

              return (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Weekly Balance Progress
                    </h3>
                    <span className="text-2xl font-bold text-blue-600">
                      {clampedPercentage}%
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Indulgences balanced out</span>
                      <span>{clampedPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${clampedPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 text-center">
                    {clampedPercentage === 0
                      ? "Start checking in your balance moves to begin balancing out indulgences!"
                      : clampedPercentage === 100
                      ? "🎉 All indulgences are balanced out! Great job!"
                      : `Keep going! You're ${clampedPercentage}% there.`}
                  </p>
                </div>
              );
            })()}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                This Week's Balance Moves
              </h2>
              <span className="text-sm text-gray-500">
                Week of{" "}
                {new Date(currentPlan.weekStartDate).toLocaleDateString()}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentPlan.healthActs.map((healthAct, index) => {
                const completedCount = healthAct.checkIns.length;
                const progressPercentage = Math.round(
                  (completedCount / healthAct.targetFrequency) * 100
                );
                const isCompleted = healthAct.isCompleted;

                return (
                  <div
                    key={index}
                    onClick={() =>
                      handleHealthActClick(
                        currentPlan._id,
                        healthAct.healthActId?._id || healthAct._id
                      )
                    }
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {healthAct.healthActId?.emoji || healthAct.emoji}
                        </span>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {healthAct.healthActId?.name || healthAct.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {healthAct.targetFrequency} times this week
                          </p>
                        </div>
                      </div>
                      {isCompleted && (
                        <span className="text-green-500 text-xl">✓</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>
                          {completedCount}/{healthAct.targetFrequency}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(progressPercentage, 100)}%`,
                            backgroundColor: isCompleted
                              ? "#10B981"
                              : "var(--primary-color)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: isCompleted
                            ? "#059669"
                            : "var(--primary-color)",
                        }}
                      >
                        {isCompleted
                          ? "Completed!"
                          : `${progressPercentage}% Complete`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No Health Plan Yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start your wellness journey by creating your first balance plan
            </p>
            <button
              onClick={() => navigate("/dashboard/allowance")}
              className="text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
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
              Create Your Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
