import { useState, useEffect } from "react";

const AIPlan = () => {
  const [healthActPlan, setHealthActPlan] = useState([
    {
      id: "30-min-workouts",
      emoji: "🏋",
      label: "30-min workouts ",
      value: 2,
      unit: "times/week",
    },
    {
      id: "walk-20-mins-after-dinner",
      emoji: "🚶🏻",
      label: "Walk 20 mins after dinner",
      value: 3,
      unit: "times/week",
    },
    {
      id: "salad-lunches",
      emoji: "🥗",
      label: "Salad lunches",
      value: 4,
      unit: "times/week",
    },
  ]);

  const updateValue = (id, change) => {
    setHealthActPlan((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, value: Math.max(0, item.value + change) }
          : item
      )
    );
  };
  console.log(healthActPlan);

  useEffect(() => {
    // Fetch or generate AI health action plan here
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Prepare data to be sent to backend
  };

  return (
    <div className="min-h-screen bg-[#ffffff] px-6 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-gray-900 text-left mb-8">Analysis & Plan</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {healthActPlan.map((item) => (
              <div className="space-y-3">
                {
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-xl px-4 py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-gray-700 font-medium">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateValue(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-500 hover:text-white transition-colors"
                      >
                        −
                      </button>
                      <span className="text-[#212529] font-medium min-w-[20px] text-center">
                        {item.value}
                      </span>
                      <button
                        onClick={() => updateValue(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-500 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#009b7a] text-white font-medium py-4 rounded-full mt-12 hover:bg-emerald-800 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIPlan;
