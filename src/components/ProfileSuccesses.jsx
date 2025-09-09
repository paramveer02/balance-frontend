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
    if (balance >= 50) return 'url("/berge.jpg")';
  };

  const chooseText = (balance) => {
    if (balance < 50) return 'Need more efforts';
    if (balance >= 55) return 'Excellent';
    if (balance >= 50) return 'Balanced week';
  };

  return (
    <div className="carousel-item overflow-hidden">
      <div
        style={{ backgroundImage: chooseImage(balancePercentage) }}
        className="min-h-[300px] sm:min-h-[400px] lg:min-h-[40vh] w-full max-w-[350px] min-w-[250px] bg-cover bg-center text-white rounded-2xl py-6 px-10 shadow-lg flex flex-col items-center justify-between"
        role="img"
        aria-label="Balance journey progress card"
      >
        <h3 className="text-!4xl sm:!text-5xl lg:!text-5xl font-bold">
          {totalHealthActs}
        </h3>
        <p className=" text-sm sm:text-base">Balance moves</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {planData.healthActs.map((act) => (
            <span className="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm">
              {act.category}
            </span>
          ))}
        </div>

        {/* Efforts */}
        <p className="mt-10 !text-2xl sm:text-base !font-semibold">
          {chooseText(balancePercentage)}
        </p>
        <div className="flex justify-between w-full text-xs sm:text-sm gap-4">
          <span>{balancePercentage}% Balance moves</span>
          <span>{100 - balancePercentage}% Indulgences</span>
        </div>
        <div
          className="w-full bg-white/30 rounded-full h-2 mb-2"
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
