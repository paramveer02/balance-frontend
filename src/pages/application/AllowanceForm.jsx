import { useState } from "react";

const AllowanceForm = () => {
  const [allowances, setAllowances] = useState([
    {
      id: "fast-food",
      emoji: "🍔",
      label: "Fast food",
      value: 0,
      unit: "times/week",
    },
    {
      id: "desert",
      emoji: "🧁",
      label: "Desert",
      value: 0,
      unit: "times/week",
    },
    {
      id: "sugary-beverage",
      emoji: "🥤",
      label: "Sugary Beverage",
      value: 0,
      unit: "cups/day",
    },
    {
      id: "alcohol",
      emoji: "🍷",
      label: "Alcohol",
      value: 0,
      unit: "cups/day",
    },
    { id: "party", emoji: "🎭", label: "Party", value: 0, unit: "times/week" },
    {
      id: "binge-watching",
      emoji: "📺",
      label: "Binge-watching",
      value: 0,
      unit: "times/week",
    },
    {
      id: "video-games",
      emoji: "🎮",
      label: "Video Games (Extended)",
      value: 0,
      unit: "times/week",
    },
    {
      id: "social-media",
      emoji: "📱",
      label: "Social Media Scrolling (Hours)",
      value: 0,
      unit: "hours/week",
    },
  ]);

  const updateValue = (id, change) => {
    setAllowances((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, value: Math.max(0, item.value + change) }
          : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Prepare data to be sent to backend
    const allowanceData = allowances.map(({ label, value }) => ({
      name: label,
      category: categories.title,
      frequency: value,
    }));
    // Now send allowanceData to your backend
    try {
      const response = await fetch("http://localhost:3100/ai/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allowanceData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit allowance data");
      }
      const healthPlan = await response.json();
      console.log("Received health plan:", healthPlan);
    } catch (error) {
      console.error("Error submitting allowance data:", error);
    }
  };

  const categories = [
    { title: "Food", unit: "times/week", items: allowances.slice(0, 2) },
    { title: "Drink", unit: "cups/day", items: allowances.slice(2, 4) },
    { title: "Social", unit: "times/week", items: allowances.slice(4, 5) },
    {
      title: "Entertainment",
      unit: "times/week",
      items: allowances.slice(5, 7),
    },
    { title: "Mental", unit: "hours/week", items: allowances.slice(7, 8) },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] px-6 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-gray-900 text-2xl font-semibold mb-8">
          Set Your Weekly Allowance
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category.title}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-gray-700 text-lg font-medium">
                    {category.title}
                  </h2>
                  <span className="text-gray-500 text-sm">{category.unit}</span>
                </div>

                <div className="space-y-3">
                  {category.items.map((item) => (
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
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#009b7a] text-white font-medium py-4 rounded-full mt-12 hover:bg-emerald-800 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
export default AllowanceForm;
