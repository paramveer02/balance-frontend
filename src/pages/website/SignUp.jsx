import { useState } from "react";
import { Form, Link, redirect } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import {
  FiUser,
  FiUserPlus,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export const signupAction = async ({ request }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    await customFetch.post("/auth/signup", data);
    toast.success("Registration Successful");
    // Redirect to login after successful signup
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Sign up failed");
    return error;
  }
};

export default function SignUp() {
  const [showPw, setShowPw] = useState(false);

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
        <div className="w-full max-w-xl bg-white rounded-4xl shadow-2xl">
          {/* Header */}
          <div className="px-8 pt-10 pb-8 text-center">
            <h1 className="font-bold text-gray-900">
              Sign up
            </h1>
            <p className="mt-2 text-md text-gray-600">
              Make your balance move today
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <Form method="post" className="space-y-6">
              {/* First name and Last name in one row */}
              <div className="grid grid-cols-2 gap-4">
                {/* First name */}
                <label className="block">
                  <span className="block mb-2 text-sm font-medium text-gray-400">
                    First name
                  </span>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
                    <FiUser className="text-gray-400 text-lg" />
                    <input
                      name="name"
                      type="text"
                      placeholder="Alex"
                      className="w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                      required
                    />
                  </div>
                </label>

                {/* Last name */}
                <label className="block">
                  <span className="block mb-2 text-sm font-medium text-gray-400">
                    Last name
                  </span>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
                    <FiUserPlus className="text-gray-400 text-lg" />
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Rivera"
                      className="w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                      required
                    />
                  </div>
                </label>
              </div>

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
                    placeholder="you@balance.app"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none"
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
                    placeholder="Create a strong password"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none"
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

              {/* CTA */}
              <button
                type="submit"
                className="w-full rounded-full bg-teal-600 py-3 font-semibold text-white shadow-lg transition hover:bg-teal-700 hover:cursor-pointer"
              >
                Create account
              </button>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-teal-600 hover:text-teal-700 underline"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
