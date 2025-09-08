import { AIThinking, Prism, ProfileCard } from "../../components";
import { Badge } from "../../components/ui/Badge";
import { useRef } from "react";

const About = () => {
  const teamSectionRef = useRef(null);

  const scrollToTeam = () => {
    teamSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    teamSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Hero Section with Prism Background */}
      <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* Prism Background Animation */}
        <div className="absolute inset-0 z-0">
          <Prism
            height={4}
            baseWidth={5}
            animationType="hover"
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
                animation: "slideInOut 2s ease-in-out infinite",
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
              Meet the passionate developers behind Balance Move, dedicated to
              making healthy living engaging and fun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ProfileCard
              name="Param"
              title="Full-stack Developer"
              handle="paramdev"
              status="Online"
              contactText="Contact Me"
              avatarUrl="Param.png"
              showUserInfo={true}
              enableTilt={false}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact Param clicked")}
            />

            <ProfileCard
              name="Cornelia"
              title="Full-stack Developer"
              handle="Corneliadev"
              status="Online"
              contactText="Contact Me"
              avatarUrl="Cornelia.png"
              showUserInfo={true}
              enableTilt={false}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact Cornelia clicked")}
            />

            <ProfileCard
              name="Ciro"
              title="Full-stack Developer"
              handle="Cirodev"
              status="Online"
              contactText="Contact Me"
              avatarUrl="Ciro.png"
              showUserInfo={true}
              enableTilt={false}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact Ciro clicked")}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
