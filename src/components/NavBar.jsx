import { Link, useRouteLoaderData, useLocation } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import { useContext, useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  // Will be undefined on public pages, defined on /dashboard*
  const dashData = useRouteLoaderData("dashboard");
  const user = dashData?.user ?? null;
  const location = useLocation();

  // Check if we're on a dashboard page
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  // DashboardContext might be undefined on public pages
  const dashboardContext = useContext(DashboardContext);
  const logoutUser = dashboardContext?.logoutUser;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

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

  return (
    <nav
      ref={navRef}
      className={
        isDashboardPage
          ? "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm"
          : "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl"
      }
    >
      <div
        className={
          isDashboardPage
            ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            : "bg-gray-600/80 backdrop-blur-md border border-white/20 rounded-full shadow-xl"
        }
      >
        <div
          className={
            isDashboardPage
              ? "flex justify-between items-center h-16"
              : "px-6 py-4"
          }
        >
          <div
            className={
              isDashboardPage
                ? "flex justify-between items-center w-full"
                : "flex justify-between items-center"
            }
          >
            {/* Logo/Brand */}
            <Link
              to={user ? "/dashboard" : "/"}
              className={
                isDashboardPage
                  ? "btn btn-ghost"
                  : "text-white text-2xl font-bold hover:text-white/80 transition-colors"
              }
            >
              {isDashboardPage ? (
                <img src="/BalanceLogo.svg" className="w-full" alt="Balance" />
              ) : (
                <img
                  src="/logo_BW.svg"
                  className="h-8"
                  alt="BalanceLogoBlack&WhiteVersion"
                />
              )}
            </Link>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link
                  to={isDashboardPage ? "/dashboard/about" : "/about"}
                  className={
                    isDashboardPage
                      ? "btn btn-ghost text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                      : "text-white/90 hover:text-white transition-colors font-medium"
                  }
                >
                  About Us
                </Link>
                {user && (
                  <Link
                    to="/dashboard"
                    className={
                      isDashboardPage
                        ? "btn btn-ghost text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        : "text-white/90 hover:text-white transition-colors font-medium"
                    }
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {user ? (
                <button
                  onClick={() => logoutUser?.()}
                  className={
                    isDashboardPage
                      ? "btn btn-ghost text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                      : "text-white/90 hover:text-white transition-colors font-medium"
                  }
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={
                      isDashboardPage
                        ? "btn btn-ghost text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        : "text-white/90 hover:text-white transition-colors font-medium"
                    }
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={
                      isDashboardPage
                        ? "btn btn-primary text-white font-medium px-6 py-2 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                        : "text-white font-medium px-6 py-2 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                    }
                    style={
                      isDashboardPage
                        ? {
                            backgroundColor: "var(--primary-color)",
                            "--tw-bg-opacity": "1",
                          }
                        : {
                            backgroundColor: "var(--primary-color)",
                            "--tw-bg-opacity": "1",
                          }
                    }
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#007A5E";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "var(--primary-color)";
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
                className={
                  isDashboardPage
                    ? "btn btn-ghost text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                    : "text-white/90 hover:text-white transition-colors"
                }
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {isMobileMenuOpen && (
            <div
              className={`md:hidden ${
                isDashboardPage
                  ? "border-t border-gray-200 dark:border-gray-700 mt-4 pt-4"
                  : "border-t border-white/20 mt-4 pt-4"
              }`}
            >
              <div className="flex flex-col space-y-4">
                <Link
                  to={isDashboardPage ? "/dashboard/about" : "/about"}
                  className={
                    isDashboardPage
                      ? "btn btn-ghost justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                      : "text-white/90 hover:text-white transition-colors font-medium"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                {user && (
                  <Link
                    to="/dashboard"
                    className={
                      isDashboardPage
                        ? "btn btn-ghost justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        : "text-white/90 hover:text-white transition-colors font-medium"
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex flex-col space-y-3 pt-2">
                  {user ? (
                    <button
                      onClick={() => {
                        logoutUser?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className={
                        isDashboardPage
                          ? "btn btn-ghost justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                          : "text-white/90 hover:text-white transition-colors font-medium text-left"
                      }
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className={
                          isDashboardPage
                            ? "btn btn-ghost justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                            : "text-white/90 hover:text-white transition-colors font-medium"
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className={
                          isDashboardPage
                            ? "btn btn-primary text-white font-medium px-6 py-2 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
                            : "text-white font-medium px-6 py-2 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
                        }
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
    </nav>
  );
}
