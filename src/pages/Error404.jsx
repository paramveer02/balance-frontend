import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Info Tag */}
      <p className="text-sm font-bold text-gray-600 mb-4 tracking-wide">
        SOMETHING WENT WRONG
      </p>
      
      {/* Main Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
        This page isn't available
      </h1>
      
      {/* 404 GIF */}
      <div className="mb-8">
        <img 
          src="/404.gif" 
          alt="404 Error" 
          className="max-w-xs md:max-w-sm mx-auto"
        />
      </div>
      
      {/* Back to Home Button */}
      <Link 
        to="/"
        className="bg-[var(--primary-color)] hover:bg-[#007A5E] text-white px-8 py-3 rounded-full font-medium transition-colors duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error404;
