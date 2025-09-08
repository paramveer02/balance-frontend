const ProfileSuccesses = ({ planData }) => {
  // Calculate balance percentage
  const calculateBalancePercentage = (currentPlan) => {
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

  const totalHealthActs = planData.healthActs.length;
  const balancePercentage = calculateBalancePercentage(planData);

  const chooseImage = (balance) => {
    if (balance < 50)
      return 'url("/1bb55c30bf6a33aaf6cfa737112420c01b47bf83.png")';
    if (balance >= 55)
      return 'url("/db22e50472f2979714b92c490ed1bcc90144f9ae.png")';
    if (balance >= 50)
      return 'url("/d002490ad04bcdb04e4bdc9666b5d99de43f6e26.png")';
  };

  return (
    <div className="carousel-item">
      <div
        style={{ backgroundImage: chooseImage(balancePercentage) }}
        className="min-h-[300px] sm:min-h-[400px] lg:min-h-[40vh] w-full max-w-md bg-cover bg-center text-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-between"
        role="img"
        aria-label="Balance journey progress card"
      >
        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          {totalHealthActs}
        </h3>
        <p className="mt-1 text-sm sm:text-base">Balance moves</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          <span className="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm">
            Nutrition
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm">
            Workout
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm">
            Hydration
          </span>
        </div>

        {/* Efforts */}
        <p className="mt-6 text-sm sm:text-base">Need more efforts</p>
        <div className="flex justify-between w-full text-xs sm:text-sm mt-6">
          <span>{balancePercentage}% Balance moves</span>
          <span>{100 - balancePercentage}% Indulgences</span>
        </div>
        <div
          className="w-full bg-white/30 rounded-full h-2 mt-2"
          role="progressbar"
          aria-valuenow={calculateBalancePercentage()}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Balance progress"
        >
          <div
            className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${balancePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSuccesses;
