import { FaGithub, FaLinkedin } from 'react-icons/fa';

const SimpleProfileCard = ({ 
  name, 
  title, 
  avatarUrl, 
  githubUrl, 
  linkedinUrl 
}) => {
  return (
    <div 
      className="relative rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors duration-300 overflow-hidden aspect-[3/4] flex flex-col justify-end"
      style={{
        backgroundImage: `url(${avatarUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 p-6 text-center">
        {/* Name */}
        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
          {name}
        </h3>

        {/* Title */}
        <p className="text-white/90 mb-6 text-lg drop-shadow-md">
          {title}
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-200 group border border-white/30"
              aria-label={`${name}'s GitHub`}
            >
              <FaGithub className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </a>
          )}
          
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-200 group border border-white/30"
              aria-label={`${name}'s LinkedIn`}
            >
              <FaLinkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleProfileCard;
