import React from "react";

const TaskDetail = () => {
  const handleComplete = () => {
    console.log("Workout completed! +20XP");
    // Add an API call or other completion logic here.
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-white dark:bg-gray-900">
      {/* Top Section */}
      <div className="w-full max-w-sm flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 cursor-pointer text-gray-800 dark:text-gray-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center w-full max-w-sm px-4">
        <h2 className="text-green-600 text-3xl font-bold mb-4">+20XP</h2>
        <h1 className="text-[10rem] font-extrabold text-gray-900 dark:text-white mb-4">
          🏃‍♂️
        </h1>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          20 mins Running (Workout)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Research shows workout will improve body strength by 5%.
        </p>

        {/* Action card */}
        <div className="w-full p-4 mt-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            This health act is efficient to balance out:
          </p>
          <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🍔</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                Fast food session
              </span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">x1</span>
          </div>
        </div>
      </div>

      {/* Simple complete button */}
      <button
        onClick={handleComplete}
        className="w-full max-w-sm h-14 bg-green-600 rounded-full flex items-center justify-center space-x-2 text-white font-semibold shadow-lg transition-all duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <span>Complete Task</span>
      </button>
    </div>
  );
};

export default TaskDetail;
