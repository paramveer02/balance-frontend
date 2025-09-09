import { useState } from "react";
import { Link } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { FiMail } from "react-icons/fi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      await customFetch.post("/auth/forgot", { email });
      setIsSuccess(true);
      setEmail("");
      toast.success("Password reset link sent successfully!");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Could not send reset link. Please check your email address.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
              Forgot Password?
            </h2>
            <p className="text-gray-600 mt-2">
              Enter your email to receive a password reset link.
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
                  Check your email for a password reset link.
                </p>
                <Link
                  to="/login"
                  className="inline-block rounded-full bg-teal-600 py-3 px-6 font-semibold text-white shadow-lg transition hover:bg-teal-700 hover:cursor-pointer"
                >
                  Back to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <label className="block">
                  <span className="block mb-2 text-sm font-medium text-gray-400">
                    Email
                  </span>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
                    <FiMail className="text-gray-400 text-lg" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                      required
                    />
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
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            )}

            {/* Back to Login Link */}
            {!isSuccess && (
              <div className="mt-6 text-center text-sm text-gray-600">
                Remember your password? {"   "}
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

export default ForgetPassword;