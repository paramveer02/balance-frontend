import { Badge } from "../../components/ui/Badge";
import AIThinking from "../../components/AIThinking";
const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-4 py-2">
            🎯 Our Mission
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
            About LevelUp Life
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're on a mission to make healthy habits as addictive as your
            favorite game. Because life is the ultimate RPG, and you're the main
            character.
          </p>
          <AIThinking />
        </div>
      </section>
    </main>
  );
};

export default About;
