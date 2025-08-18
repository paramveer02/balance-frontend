import Button from "./ui/Button";
import { Badge } from "./ui/Badge";
export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-green-600/10" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-4 py-2">
          🚀 Level Up Your Life
        </Badge>

        <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
          LevelUp Life
        </h1>

        <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform your daily habits into epic quests. Earn XP, unlock
          achievements, and level up your real-world life through gamified
          wellness challenges.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="btn btn-primary">⚡ Claim Your Streak</button>
          <button className="btn btn-secondary">🎯 Build a New Ritual</button>
        </div>

        <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>10K+ Active Players</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>1M+ Rituals Completed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
