import AIThinking from "../../components/AIThinking";
import ProfileCard from "../../components/ui/ProfileCard";

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-medium">
            🎯 Our Mission
          </div>
        
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            We're on a mission to make healthy habits as addictive as your
            favorite game. Because life is the ultimate RPG, and you're the main
            character.
          </p>
          <AIThinking />
        </div>

        {/* Our Team Section */}
        <div className="mt-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Our Team</h1>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Meet the passionate developers behind Balance Move, dedicated to making healthy living engaging and fun.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
           
              <ProfileCard
                name="Param"
                title="Full-stack Developer"
                handle="paramdev"
                status="Online"
                contactText="Contact Me"
                avatarUrl="Param.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact Param clicked')}
              />
            
            
         
              <ProfileCard
                name="Cornelia"
                title="Full-stack Developer"
                handle="Corneliadev"
                status="Online"
                contactText="Contact Me"
                avatarUrl="Cornelia.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact Cornelia clicked')}
              />
         
            
      
              <ProfileCard
                name="Ciro"
                title="Full-stack Developer"
                handle="Cirodev"
                status="Online"
                contactText="Contact Me"
                avatarUrl="Ciro.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact Ciro clicked')}
              />
          
          </div>
        </div>

       

      </section>
    </main>
  );
};

export default About;
