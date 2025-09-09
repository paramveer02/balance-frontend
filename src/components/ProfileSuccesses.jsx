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

  // Get unique categories (remove duplicates)
  const uniqueCategories = [...new Set(planData.healthActs.map((act) => act.category))];

  const chooseImage = (balance) => {
    if (balance < 50)
      return 'url("/BackgroundImage01.png")';
    if (balance >= 50 && balance < 75)
      return 'url("/BackgroundImage02.png")';
    if (balance >= 75) return 'url("/BackgroundImage03.png")';
  };

  const chooseText = (balance) => {
    if (balance < 50) return 'Need more efforts';
    if (balance >= 75) return 'Excellent';
    if (balance >= 50 && balance < 75) return 'Balanced week';
  };

  return (
    <div className="carousel-item overflow-hidden  rounded-3xl">
      <div
        style={{ backgroundImage: chooseImage(balancePercentage) }}
        className="relative min-h-[400px] w-full max-w-[80vw] min-w-[280px] bg-cover bg-center text-white rounded-3xl shadow-2xl overflow-hidden"
        role="img"
        aria-label="Balance journey progress card"
      >
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0  bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-purple-900/40"></div>
        
        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col p-8 ">
          {/* Top Section - Number and Label */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="!text-8xl !font-light leading-none">
                {totalHealthActs}
              </h2>
              <p className="text-lg font-medium text-white/90">Balance moves</p>
            </div>
            
            {/* Date Range Badge */}
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
              <span className="text-sm font-normal text-white/100">
                {planData.weekStartDate ? 
                  (() => {
                    const startDate = new Date(planData.weekStartDate);
                    const endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 6); // Add 6 days to get end of week
                    
                    const formatDate = (date) => {
                      return date.toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'short' 
                      });
                    };
                    
                    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
                  })() : 
                  'No date'
                }
              </span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-3 mb-16">
            {uniqueCategories.map((category) => (
              <div
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium border bg-white/20 border-white/40 text-white"
              >
                {category}
              </div>
            ))}
          </div>

          {/* Central Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center">
         
            {/* Status Text */}
            <p className="text-2xl text-center mb-2">
              {chooseText(balancePercentage)}
            </p>
          </div>

          {/* Bottom Progress Section */}
          <div className="space-y-2">

          {/* Percentage Split */}
          <div className="flex justify-between items-center text-sm">
               <div className="text-center">
                 <div className="text-2xl text-left !font-normal">{balancePercentage}%</div>
                 <div className="text-white/80">Balance moves</div>
               </div>
               
               <div className="w-px h-8 bg-white/30"></div>
               
               <div className="text-center">
                 <div className="text-2xl text-right !font-normal">{100 - balancePercentage}%</div>
                 <div className="text-white/80">Indulgences</div>
               </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${balancePercentage}%` }}
              />
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSuccesses;
