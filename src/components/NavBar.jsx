import {
  Link,
  useRouteLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { DashboardContext } from "../context/DashboardContext";
import { useContext, useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  // Will be undefined on public pages, defined on /dashboard*
  const dashData = useRouteLoaderData("dashboard");
  const user = dashData?.user ?? null;
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on a dashboard page
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  // DashboardContext might be undefined on public pages
  const dashboardContext = useContext(DashboardContext);
  const logoutUser = dashboardContext?.logoutUser;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const navRef = useRef(null);
  const [navLoading, setNavLoading] = useState(false);
  const loaderUrl = "/lottie/loader.lottie";

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle scroll detection for dashboard navbar
  useEffect(() => {
    if (!isDashboardPage) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDashboardPage]);

  // Handle contrast detection for website navbar
  useEffect(() => {
    if (isDashboardPage) return;

    const handleScroll = () => {
      const navbar = navRef.current;
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      const navbarCenter = navbarRect.top + navbarRect.height / 2;
      
      // Get element at navbar center position
      const elementBelow = document.elementFromPoint(
        navbarRect.left + navbarRect.width / 2,
        navbarCenter + navbarRect.height
      );
      
      if (elementBelow) {
        const computedStyle = window.getComputedStyle(elementBelow);
        const backgroundColor = computedStyle.backgroundColor;
        
        // Check if background is light (high brightness)
        const rgb = backgroundColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          setIsOverLightSection(brightness > 200);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDashboardPage]);

  useEffect(() => {
    setNavLoading(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!navLoading) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [navLoading]);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const goToReport = async (e) => {
    e.preventDefault();
    if (location.pathname.startsWith("/dashboard/report")) return; // already there
    setIsMobileMenuOpen(false);
    setNavLoading(true);
    await sleep(1000); // show lottie for ~2s
    navigate("/dashboard/report"); // then navigate
  };

  return (
    <>
      <nav
        ref={navRef}
        className={
          isDashboardPage
            ? `bg-white dark:bg-gray-800 sticky top-0 z-50 transition-all duration-300 ${
                isScrolled
                  ? "border-b border-gray-200 dark:border-gray-700"
                  : ""
              }`
            : "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl"
        }
      >
        {isDashboardPage ? (
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex justify-between items-center w-full">
                {/* Left side - Logo/Brand */}
                <Link to={user ? "/dashboard" : "/"}>
                  <img
                    src="/BalanceLogo.svg"
                    className="w-full"
                    alt="Balance"
                  />
                </Link>

                {/* Navigation Links - Hidden on mobile */}
                <div className="hidden md:block">
                  <div className="flex items-center space-x-4">
                    {user && (
                      <Link
                        to="/dashboard"
                        className="navbar-tab-text relative text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
                      >
                        Dashboard
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                      </Link>
                    )}
                    {user && (
                      <Link
                        to="/dashboard/report"
                        onClick={goToReport}
                        className="navbar-tab-text relative text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
                      >
                        Report
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all duration-300 ease-out ${
                            location.pathname.startsWith("/dashboard/report")
                              ? "w-full"
                              : "w-0"
                          } group-hover:w-full`}
                        />
                      </Link>
                    )}
                    <Link
                      to="/dashboard/about"
                      className="navbar-tab-text relative text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
                    >
                      About Us
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </Link>
                  </div>
                </div>

                {/* Right side - User avatar, hamburger menu, and auth buttons */}
                <div className="flex items-center space-x-3">
                  {user ? (
                    <>
                      {/* Logout button - Desktop only */}
                      <div className="hidden md:block">
                        <button
                          onClick={() => logoutUser?.()}
                          className="text-gray-400 cursor-pointer dark:text-gray-500 font-medium hover:text-red-500 hover:underline transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </div>
                      {/* User Profile Avatar */}
                      <Link 
                        to="/dashboard/profile"
                        className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-green-400 transition-all duration-200 flex items-center justify-center"
                        aria-label="Go to user profile"
                      >
                        {user.profileImageUrl ? (
                          <img 
                            src={user.profileImageUrl} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initial letter on image load error
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `<span class="w-full h-full bg-green-100 dark:bg-green-600 flex items-center justify-center"><span class="text-md font-bold text-green-800 dark:text-green-100">${user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span></span>`;
                            }}
                          />
                        ) : (
                          <span className="w-full h-full bg-green-100 dark:bg-green-600 flex items-center justify-center">
                            <span className="text-md font-bold text-green-800 dark:text-green-100">
                              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </span>
                          </span>
                        )}
                      </Link>
                      {/* Mobile menu button */}
                      <div className="md:hidden">
                        <button
                          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          className="btn btn-ghost text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        >
                          {isMobileMenuOpen ? (
                            <X size={24} />
                          ) : (
                            <Menu size={24} />
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="btn btn-ghost text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="btn btn-primary text-white font-medium px-6 py-2 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                        style={{
                          backgroundColor: "var(--primary-color)",
                          "--tw-bg-opacity": "1",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#007A5E";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            "var(--primary-color)";
                        }}
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile menu dropdown */}
              {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
                  <div className="px-6 py-4">
                    <div className="flex flex-col space-y-4">
                      <Link
                        to="/dashboard/about"
                        className="btn btn-ghost justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        About Us
                      </Link>
                      {user && (
                        <Link
                          to="/dashboard"
                          className="btn btn-ghost justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      )}
                      {user && (
                        <Link
                          to="/dashboard/report"
                          className="btn btn-ghost justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                          onClick={goToReport}
                        >
                          Report
                        </Link>
                      )}
                      <div className="flex flex-col space-y-3 pt-2">
                        {user ? (
                          <button
                            onClick={() => {
                              logoutUser?.();
                              setIsMobileMenuOpen(false);
                            }}
                            className="btn btn-ghost justify-start text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            Logout
                          </button>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              className="btn btn-ghost justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Login
                            </Link>
                            <Link
                              to="/signup"
                              className="btn btn-primary text-white font-medium px-6 py-2 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
                              style={{
                                backgroundColor: "var(--primary-color)",
                                "--tw-bg-opacity": "1",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#007A5E";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor =
                                  "var(--primary-color)";
                              }}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Signup
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-300 ${
              isOverLightSection 
                ? "bg-black/20 backdrop-blur-lg border border-white/20 shadow-2xl" 
                : "bg-white/10 backdrop-blur-md border border-white/10 shadow-lg"
            } ${
              isMobileMenuOpen ? "rounded-2xl" : "rounded-full"
            }`}
          >
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                {/* Logo/Brand */}
                <Link
                  to={user ? "/dashboard" : "/"}
                  className={`text-white text-2xl font-bold hover:text-white/80 transition-all duration-300 ${
                    isOverLightSection ? "drop-shadow-lg" : ""
                  }`}
                >
                  <img
                    src="/logo_BW.svg"
                    className={`h-8 transition-all duration-300 ${
                      isOverLightSection ? "drop-shadow-lg" : ""
                    }`}
                    alt="BalanceLogoBlack&WhiteVersion"
                  />
                </Link>

                {/* Navigation Links - Hidden on mobile */}
                <div className="hidden md:block">
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/about"
                      className={`text-white/90 hover:text-white transition-all duration-300 font-medium ${
                        isOverLightSection ? "drop-shadow-md" : ""
                      }`}
                    >
                      About Us
                    </Link>
                    {user && (
                      <Link
                        to="/dashboard"
                        className={`text-white/90 hover:text-white transition-all duration-300 font-medium ${
                          isOverLightSection ? "drop-shadow-md" : ""
                        }`}
                      >
                        Dashboard
                      </Link>
                    )}
                  </div>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                  {user ? (
                    <button
                      onClick={() => logoutUser?.()}
                      className={`text-white/90 hover:text-white transition-all duration-300 font-medium ${
                        isOverLightSection ? "drop-shadow-md" : ""
                      }`}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className={`text-white/90 hover:text-white transition-all duration-300 font-medium ${
                          isOverLightSection ? "drop-shadow-md" : ""
                        }`}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className={`text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
                          isOverLightSection ? "drop-shadow-lg" : ""
                        }`}
                        style={{
                          backgroundColor: "var(--primary-color)",
                          "--tw-bg-opacity": "1",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#007A5E";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            "var(--primary-color)";
                        }}
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>

              {/* Mobile menu dropdown */}
              {isMobileMenuOpen && (
                <div className="md:hidden border-t border-white/20 mt-4 pt-4 h-[80vh] flex flex-col justify-center items-center">
                  <div className="flex flex-col space-y-8 items-center">
                    {/* Big Title */}
                    <h1
                      className="text-white text-center leading-tight px-4"
                      style={{ fontSize: "2rem", fontWeight: "medium" }}
                    >
                      MAKE YOUR BALANCE MOVE TODAY.
                    </h1>

                    <Link
                      to="/about"
                      className="text-white/90 hover:text-white transition-colors font-medium text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    {user && (
                      <Link
                        to="/dashboard"
                        className="text-white/90 hover:text-white transition-colors font-medium text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <div className="flex flex-col space-y-6 items-center">
                      {user ? (
                        <button
                          onClick={() => {
                            logoutUser?.();
                            setIsMobileMenuOpen(false);
                          }}
                          className="text-white/90 hover:text-white transition-colors font-medium text-center"
                        >
                          Logout
                        </button>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="text-white/90 hover:text-white transition-colors font-medium text-center"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className="text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
                            style={{
                              backgroundColor: "var(--primary-color)",
                              "--tw-bg-opacity": "1",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#007A5E";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor =
                                "var(--primary-color)";
                            }}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Signup
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {navLoading && (
        <div className="fixed inset-0 z-[9999] grid place-items-center bg-slate-950/70 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            {/* Non-worker = no OffscreenCanvas issue */}
            <DotLottieReact
              key="report-loader" // forces a fresh canvas
              src={loaderUrl}
              autoplay
              loop
              style={{ width: 160, height: 160 }}
            />
            <p className="mt-3 text-slate-100">Opening your report…</p>
          </div>
        </div>
      )}
    </>
  );
}
