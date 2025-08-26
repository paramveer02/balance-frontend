import { Link } from 'react-router';
import Button from './ui/Button';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { signOut } from '../data/auth';

export function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logOut = async () => {
    try {
      await signOut();
      console.log('Logout successful!');
      setIsAuth(false);
    } catch (error) {
      console.log('Something went wrong. Logout failed!');
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link className="btn btn-ghost" to="/">
              <img src="/BalanceLogo.svg" className="w-full"></img>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/about" className="btn btn-ghost">
                About Us
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAuth ? (
              <Link to="/" className="btn btn-ghost" onClick={logOut}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
            )}

            <Link to="/signup" className="btn btn-primary">
              Signup
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
