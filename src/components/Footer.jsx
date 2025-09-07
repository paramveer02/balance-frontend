export function Footer() {
  return (
    <footer className="bg-gray-50 rounded-t-2xl w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Jumbo Logo Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block max-w-full">
            <img 
              src="/footerLogo.svg" 
              alt="Balance" 
              className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto mx-auto"
            />
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-300 mb-6 sm:mb-8"></div>

        {/* Footer Content */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Copyright */}
          <div className="text-sm text-gray-600 order-2 sm:order-1">
            © {new Date().getFullYear()} Balance team. All rights reserved.
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 order-1 sm:order-2">
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors duration-200"
            >
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
