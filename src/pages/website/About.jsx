import { Prism } from '../../components';
import { Badge } from '../../components/ui/Badge';

const About = () => {
  return (
    <>
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
        </section>
      </main>
    </>
  );
};

export default About;