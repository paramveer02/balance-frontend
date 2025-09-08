export function Footer() {
  return (
    <footer className="bg-gray-100 rounded-t-2xl w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Mobile Layout: Vertical Stack (viewport < 1280px) */}
        <div className="flex flex-col items-center space-y-8 xl:hidden">
          {/* Logo */}
          <div className="text-center">
            <img 
              src="/GradientLogo.png" 
              alt="Balance" 
              className="h-20 w-auto mx-auto"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200"
            >
              Cookies Settings
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Balance team. All rights reserved.
          </div>
        </div>

        {/* Desktop Layout: Horizontal Three-Column (viewport >= 1280px) */}
        <div className="hidden xl:flex justify-between items-end min-h-[60px] relative">
          {/* Left: Copyright */}
          <div className="text-sm text-gray-400 pb-2">
            © {new Date().getFullYear()} Balance team. All rights reserved.
          </div>

          {/* Center: Logo - Absolutely positioned to center of viewport */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="/GradientLogo.png" 
              alt="Balance" 
              className="h-6 lg:h-8 xl:h-10 w-auto pb-2"
            />
          </div>

          {/* Right: Navigation Links */}
          <div className="flex gap-6 pb-2">
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200"
            >
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
