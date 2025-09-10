// Login
import { useState } from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const loginAction = async ({ request }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("User logged in Successfully");

    // Always redirect to dashboard first, let the client handle onboarding check
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed");
    return error;
  }
};

const loaderUrl = "/lottie/loader.lottie";

export default function Login() {
  const [showPw, setShowPw] = useState(false);
  const navigation = useNavigation();
  const busy =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {busy && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <DotLottieReact
              src={loaderUrl}
              autoplay
              loop
              style={{ width: 160, height: 160 }}
            />
            <p className="text-white">Signing you in…</p>
          </div>
        </div>
      )}

      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://static.vecteezy.com/system/resources/previews/009/482/964/mp4/side-view-of-a-slender-young-woman-sitting-on-a-pier-in-a-lotus-position-and-raising-her-hands-up-woman-practicing-yoga-on-the-beach-at-sunset-against-the-water-4k-slow-motion-free-video.mp4"
            type="video/mp4"
          />
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
            <h2 className="text-gray-900">Welcome Back!</h2>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <Form method="post" className="space-y-6">
              {/* Email */}
              <label className="block">
                <span className="block mb-2 text-sm font-medium text-gray-400">
                  Email
                </span>
                <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
                  <FiMail className="text-gray-400 text-lg" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none"
                    required
                  />
                </div>
              </label>

              {/* Password */}
              <label className="block">
                <span className="block mb-2 text-sm font-medium text-gray-400">
                  Password
                </span>
                <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
                  <FiLock className="text-gray-400 text-lg" />
                  <input
                    name="password"
                    type={showPw ? "text" : "password"}
                    placeholder="At least 8 characters"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between text-sm">
                <span />
                <Link
                  to="/forget-password"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  Forget your password?
                </Link>
              </div>

              {/* Primary CTA */}
              <button
                type="submit"
                className="w-full rounded-full bg-teal-600 py-3 font-semibold text-white shadow-lg transition hover:bg-teal-700 hover:cursor-pointer"
              >
                Login
              </button>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-teal-600 hover:text-teal-700 underline"
              >
                Sign up now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
