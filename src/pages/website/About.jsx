import { AIThinking, Prism } from '../../components';
import { Badge } from '../../components/ui/Badge';
import SimpleProfileCard from '../../components/SimpleProfileCard';
import { useRef, useState } from 'react';

const About = () => {
  const teamSectionRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const scrollToTeam = () => {
    teamSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleLikeClick = () => {
    setIsLiked(true);
    setShowThankYou(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setShowThankYou(false);
      setIsLiked(false);
    }, 2000);
  };
  return (
    <>
      <style jsx>{`
        @keyframes slideInOut {
          0% {
            transform: translateY(100%) translateX(-50%);
            opacity: 0;
          }
          20% {
            transform: translateY(0) translateX(-50%);
            opacity: 1;
          }
          80% {
            transform: translateY(0) translateX(-50%);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%) translateX(-50%);
            opacity: 0;
          }
        }
        .animate-slide-in-out {
          animation: slideInOut 2s ease-in-out;
        }
      `}</style>
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Hero Section with Prism Background */}
      <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* Prism Background Animation */}
        <div className="absolute inset-0 z-0">
          <Prism
            height={4}
            baseWidth={5}
            animationType="3drotate"
            glow={1}
            scale={1.3}
            hueShift={0.3}
            colorFrequency={1}
            timeScale={0.8}
            transparent={true}
            noise={0.25}
            bloom={1.5}
            suspendWhenOffscreen={true}
          />
        </div>

        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        {/* Content Overlay */}
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6 py-20">
          <Badge variant="subtle" className="mb-8">
            Our Mission
          </Badge>

          <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
            Make healthy habits effortless, fun, and unstoppable.
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-12 max-w-2xl mx-auto">
            Transform your daily routines into engaging experiences with our
            AI-powered health tracking platform. Make every step count towards a
            better you.
          </p>
        </div>

        {/* Scroll to team - positioned at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div
            onClick={scrollToTeam}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-white/80 text-sm sm:text-lg font-medium group-hover:text-white transition-colors duration-300 whitespace-nowrap">
              Scroll to see the team
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white/60 group-hover:text-white transition-all duration-300 animate-pulse"
              style={{
                animation: 'slideInOut 2s ease-in-out infinite',
              }}
            >
              <path
                d="M7 13l3 3 3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 6l3 3 3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>
      {/* Our Team Section */}
      <section
        ref={teamSectionRef}
        className="py-20 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Team
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the passionate developers behind this product, dedicated to
              making healthy living engaging and fun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <SimpleProfileCard
              name="Param Marwah"
              title="Full-stack Developer"
              avatarUrl="/Param.png"
              githubUrl="https://github.com/paramveer02"
              linkedinUrl="https://linkedin.com/in/param"
            />

            <SimpleProfileCard
              name="Cornelia"
              title="Full-stack Developer"
              avatarUrl="/Cornelia.png"
              githubUrl="https://github.com/nadaslia"
              linkedinUrl="https://linkedin.com/in/cornelia"
            />

            <SimpleProfileCard
              name="Ciro"
              title="Full-stack Developer"
              avatarUrl="/Ciro.png"
              githubUrl="https://github.com/Cirooochen"
              linkedinUrl="https://www.linkedin.com/in/cirochen0406/"
            />
          </div>

          {/* Like our team button */}
          <div className="flex justify-center mt-16">
            <div className="relative">
              <button
                onClick={handleLikeClick}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                  isLiked
                    ? 'bg-pink-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path
                    fill={isLiked ? "#fff" : "#ef4444"}
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                {isLiked ? 'Love received' : 'Like our team'}
              </button>

              {/* Thank you message */}
              {showThankYou && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <p className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg animate-slide-in-out">
                    🙏🏻 Danke!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default About;
