import { useState } from "react";
import { useNavigate } from "react-router";
import { Minus, Plus } from "lucide-react";

const AllowanceForm = () => {
  const Navigate = useNavigate();
  //Dummy data for allowances
  const [allowances, setAllowances] = useState([
    {
      id: "fast-food",
      emoji: "🍔",
      name: "Fast food",
      frequency: 0,
      unit: "times/week",
    },
    {
      id: "desert",
      emoji: "🧁",
      name: "Desert",
      frequency: 0,
      unit: "times/week",
    },
    {
      id: "sugary-beverage",
      emoji: "🥤",
      name: "Sugary Beverage",
      frequency: 0,
      unit: "cups/day",
    },
    {
      id: "alcohol",
      emoji: "🍷",
      name: "Alcohol",
      frequency: 0,
      unit: "cups/day",
    },
    {
      id: "party",
      emoji: "🎭",
      name: "Party",
      frequency: 0,
      unit: "times/week",
    },
    {
      id: "binge-watching",
      emoji: "📺",
      name: "Binge-watching",
      frequency: 0,
      unit: "times/week",
    },
    {
      id: "video-games",
      emoji: "🎮",
      name: "Video Games (Extended)",
      frequency: 0,
      unit: "times/week",
    },
    {
      id: "social-media",
      emoji: "📱",
      name: "Social Media Scrolling (Hours)",
      frequency: 0,
      unit: "hours/week",
    },
  ]);

  const updateFrequency = (id, change) => {
    setAllowances((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, frequency: Math.max(0, item.frequency + change) }
          : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Prepare data to be sent to backend
    Navigate("/aiplan");

    // const allowanceData = allowances.map(({ name, frequency }) => ({
    //   name: name,
    //   category: categories.title,
    //   frequency: frequency,
    // }));

    // // Now send allowanceData to your backend
    // try {
    //   const response = await fetch("http://localhost:3100/ai/calculate", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(allowanceData),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to submit allowance data");
    //   }
    //   const healthPlan = await response.json();
    //   console.log("Received health plan:", healthPlan);
    // } catch (error) {
    //   console.error("Error submitting allowance data:", error);
    // }
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
            {/* Map category, then map allowance items*/}
            {categories.map((category) => (
              <div key={category.title}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-gray-700 text-lg font-medium">
                    {category.title}
                  </h2>
                  <span className="text-gray-500 text-sm">{category.unit}</span>
                </div>

                {/* Allowance item List */}
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-xl px-4 py-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-gray-700 font-medium">
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updateFrequency(item.id, -1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300  active:bg-gray-500 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-400" />
                        </button>
                        <span className="text-gray-600 w-4 text-center text-md">
                          {item.frequency}
                        </span>
                        <button
                          onClick={() => updateFrequency(item.id, 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300  active:bg-gray-500 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-400" />
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
