// Allowance

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { weeklyAllowance } from "../../data/weeklyAllowance";
import customFetch from "../../utils/customFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const loaderUrl = "/lottie/loader.lottie";

const AllowanceForm = () => {
  //Dummy data for allowances
  const allIndulgences = weeklyAllowance.flatMap((category) => category.items);
  const [allowances, setAllowances] = useState(allIndulgences);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const updateFrequency = (id, change) => {
    setAllowances((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, frequency: Math.max(0, item.frequency + change) }
          : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Prepare data to be sent to backend
    const filteredAllowances = allowances.filter((item) => item.frequency > 0);
    if (!filteredAllowances.length) {
      toast.info("Pick at least one allowance.");
      return;
    }

    setBusy(true);
    try {
      const response = await customFetch.post(
        "/ai/calculate",
        filteredAllowances
      );
      const AIPlan = response.data;
      localStorage.setItem("AIPlan", JSON.stringify(AIPlan));
      // Redirect to AIPlan page
      navigate("/dashboard/aiplan");
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] px-6 py-8">
      {busy && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <DotLottieReact
              src={loaderUrl}
              autoplay
              loop
              style={{ width: 160, height: 160 }}
            />
            <p className="mt-3 text-slate-100">
              Preparing your balance routine…
            </p>
          </div>
        </div>
      )}
      <div className="max-w-md mx-auto">
        <h1 className="text-gray-900 text-2xl font-semibold mb-8">
          Set Your Weekly Allowance
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Map category, then map allowance items*/}
            {weeklyAllowance.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-gray-700 text-lg font-medium">
                    {category.name}
                  </h2>
                  <span className="text-gray-500 text-sm">{category.unit}</span>
                </div>

                {/* Allowance item List */}
                <div className="space-y-3">
                  {allowances
                    .filter((item) => item.category === category.name)
                    .map((item) => (
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
                            type="button"
                            onClick={() => updateFrequency(item.id, -1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300  active:bg-gray-500 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-400" />
                          </button>
                          <span className="text-gray-600 w-4 text-center text-md">
                            {item.frequency}
                          </span>
                          <button
                            type="button"
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
