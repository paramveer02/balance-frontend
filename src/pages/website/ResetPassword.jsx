import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isValidToken, setIsValidToken] = useState(true);
  
  const { token } = useParams();
  const navigate = useNavigate();

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await customFetch.patch(`/auth/resetPassword/${token}`, { password });
      setIsSuccess(true);
      setPassword("");
      toast.success("Password reset successfully!");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to reset password. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://static.vecteezy.com/system/resources/previews/009/482/964/mp4/side-view-of-a-slender-young-woman-sitting-on-a-pier-in-a-lotus-position-and-raising-her-hands-up-woman-practicing-yoga-on-the-beach-at-sunset-against-the-water-4k-slow-motion-free-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="block">
              <img 
                src="/logo_BW.svg" 
                alt="Balance" 
                className="h-12 w-auto hover:opacity-80 transition-opacity cursor-pointer"
              />
            </Link>
          </div>

          {/* Error Card */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="px-8 pt-10 pb-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-gray-900 text-2xl font-semibold mb-2">
                Invalid Reset Link
              </h2>
              <p className="text-gray-600 mb-6">
                This password reset link is invalid or has expired.
              </p>
              <Link
                to="/forget-password"
                className="inline-block rounded-full bg-teal-600 py-3 px-6 font-semibold text-white shadow-lg transition hover:bg-teal-700 hover:cursor-pointer"
              >
                Request New Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://static.vecteezy.com/system/resources/previews/009/482/964/mp4/side-view-of-a-slender-young-woman-sitting-on-a-pier-in-a-lotus-position-and-raising-her-hands-up-woman-practicing-yoga-on-the-beach-at-sunset-against-the-water-4k-slow-motion-free-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {/* Logo outside of card */}
        <div className="mb-8">
          <Link to="/" className="block">
            <img 
              src="/logo_BW.svg" 
              alt="Balance" 
              className="h-12 w-auto hover:opacity-80 transition-opacity cursor-pointer"
            />
          </Link>
        </div>

        {/* Clean white modal */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="px-8 pt-10 pb-8 text-center">
            <h2 className="text-gray-900 text-2xl font-semibold">
              Reset Password
            </h2>
            <p className="text-gray-600 mt-2">
              Enter your new password below.
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600 mb-6">
                  Your password has been reset successfully. Redirecting to login...
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Password */}
                <label className="block">
                  <span className="block mb-2 text-sm font-medium text-gray-400">
                    New Password
                  </span>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
                    <FiLock className="text-gray-400 text-lg" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </label>

                {/* Error Message */}
                {error && (
                  <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-teal-600 py-3 font-semibold text-white shadow-lg transition hover:bg-teal-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            {/* Back to Login Link */}
            {!isSuccess && (
              <div className="mt-6 text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-teal-600 hover:text-teal-700 underline"
                >
                  Log in.
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;